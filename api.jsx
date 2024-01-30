import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    addDoc,
    setDoc,
} from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyCQa336dFDxzgsokVt0v4YhBGbeTOJJqg8',
    authDomain: 'vanlife-147.firebaseapp.com',
    projectId: 'vanlife-147',
    storageBucket: 'vanlife-147.appspot.com',
    messagingSenderId: '269745453498',
    appId: '1:269745453498:web:4b371108fe092f5d9a0583',
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
// Refactoring the fetching functions below
const vansCollectionRef = collection(database, 'vans');
const usersCollectionRef = collection(database, 'users');
//
//
//

// Check if this mail is busy
export async function checkEmail(email) {
    const q = query(usersCollectionRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    const array = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    let boolean = false;
    if (array.length === 1) {
        boolean = false;
    } else {
        boolean = true;
    }
    return boolean;
}

export async function createUsers(userData) {
    try {
        await addDoc(usersCollectionRef, userData);
    } catch (error) {
        console.log('Error when adding a new user:', error);
    }
}

export function pushUserToLocalStorage(
    name,
    hostId,
    hostVans,
    id,
    email,
    password,
    transaction
) {
    const user = {
        name,
        hostId,
        hostVans,
        id,
        email,
        password,
        transaction,
    };
    localStorage.setItem('user', JSON.stringify(user));
}

export async function loginUser(data) {
    const snapshot = await getDocs(usersCollectionRef);
    const users = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    const email = data.email;
    const password = data.password;
    const user = users.find((u) => u.email == email && u.password == password);
    pushUserToLocalStorage(
        user.name,
        user.hostId,
        user.hostVans,
        user.id,
        user.email,
        user.password,
        user.transaction
    );
    return user;
}

export async function getVan(id) {
    const docRef = doc(database, 'vans', id);
    const snapshot = await getDoc(docRef);
    return {
        ...snapshot.data(),
        id: snapshot.id,
    };
}

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef);
    const vans = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return vans;
}

export async function addVansToUserHost(id, priceTransaction, transactionDay) {
    const van = await getVan(id);
    const { hostId } = van;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user.hostVans.includes(hostId)) {
        // If vanHostId doesn't exist, add him
        user.hostVans.push(hostId);
        user.transaction.push({
            cash: priceTransaction,
            hostId: hostId,
            days: transactionDay,
        });
        try {
            // We get a link to the user's data
            const docRef = doc(database, 'users', user.id);

            // Get his data
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();

            // Update user info whith added vanHostId
            userData.hostVans = user.hostVans;
            userData.transaction = user.transaction;

            // Push newData to the Firebase
            await setDoc(docRef, userData);

            // Updat localStorage data
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Error adding vanHostId to hostVans user:', error);
        }
    } else {
        console.log('hostId already exists in the users hostVans');
    }
}

export async function deleteVansFromHost(id) {
    const van = await getVan(id.toString());
    const vanHostId = van.hostId;
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.hostVans) {
        user.hostVans = user.hostVans.filter(
            (hostedId) => hostedId !== vanHostId
        );

        localStorage.setItem('user', JSON.stringify(user));
        const docRef = doc(database, 'users', user.id);

        const docSnap = await getDoc(docRef, user.id);
        await setDoc(docRef, user);
    }
}

export async function getHostVans() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userHostVans = user.hostVans;

        const arrayUserHostVansElements = await Promise.all(
            userHostVans.map(async (van) => {
                // Create a Firestore query to retrieve documents based on 'hostId'
                const q = query(vansCollectionRef, where('hostId', '==', van));
                // Get the document snapshot from the query
                const snapshot = await getDocs(q);
                // Map over the documents to create an array of van objects with an 'id' field
                const vans = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                return vans;
            })
        );

        // Flatten the array of arrays into a single array using reduce
        const flattenedArray = arrayUserHostVansElements.reduce(
            (acc, curr) => [...acc, ...curr],
            []
        );
        // Return the flattened array of host vans
        return flattenedArray;
    } catch (error) {
        console.error('Error fetching host vans:', error);
        throw error;
    }
}

export async function changeUserinfo(newUserInfo) {
    const docRef = doc(database, 'users', newUserInfo.id);

    const docSnap = await getDoc(docRef, newUserInfo);
    const userData = docSnap.data();

    userData.name = newUserInfo.name;
    userData.email = newUserInfo.email;
    userData.password = newUserInfo.password;

    await setDoc(docRef, userData);
}
