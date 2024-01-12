import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    addDoc,
    setDoc
} from "firebase/firestore/lite"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCQa336dFDxzgsokVt0v4YhBGbeTOJJqg8",
    authDomain: "vanlife-147.firebaseapp.com",
    projectId: "vanlife-147",
    storageBucket: "vanlife-147.appspot.com",
    messagingSenderId: "269745453498",
    appId: "1:269745453498:web:4b371108fe092f5d9a0583"
};

const app = initializeApp(firebaseConfig)
const database = getFirestore(app)
// Refactoring the fetching functions below
const vansCollectionRef = collection(database, "vans")
const usersCollectionRef = collection(database, "users")


export async function addItemToUsers(item) {
    try {
        await addDoc(usersCollectionRef, item,)
    } catch (error) {
        console.log("Ошибка при добавлении нового объекта:", error);
    }
}

export function pushUserToLocalStorage(name, hostId, hostVans, id, email, password) {
    const user = {
        name: name,
        hostId: hostId,
        hostVans: hostVans,
        id: id,
        email: email, 
        password: password
    };
    localStorage.setItem("user", JSON.stringify(user));
}

export async function loginUser(data) {
    const snapshot = await getDocs(usersCollectionRef)
    const users = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    const email = data.email
    const password = data.password
    const user = users.find(u => u.email == email && u.password == password)
        pushUserToLocalStorage(user.name, user.hostId, user.hostVans, user.id, user.email, user.password)
    return user
}


export async function checkEmail(email) {
    const q = query(usersCollectionRef, where("email", "==", email));
    const snapshot = await getDocs(q)
    const array = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    let boolean = false
    if (array.length === 1) {
        boolean = false
    } else {
        boolean = true
    }
    return boolean
}

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(database, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function addVansToUserHost(id) {
    const van = await getVan(id);
    const vanHostId = van.hostId;

    // Получаем текущего пользователя
    const user = JSON.parse(localStorage.getItem("user"));

    // Проверяем, существует ли уже vanHostId в hostVans пользователя
    if (!user.hostVans.includes(vanHostId)) {
        // Если vanHostId не существует, добавляем его
        user.hostVans.push(vanHostId);

        try {
            // Получаем ссылку на документ пользователя
            const docRef = doc(database, "users", user.id);

            // Получаем текущие данные пользователя из базы данных
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();

            // Обновляем данные пользователя с добавленным vanHostId
            userData.hostVans = user.hostVans;

            // Записываем обновленные данные в базу данных
            await setDoc(docRef, userData);

            // Обновляем информацию в localStorage
            localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
            console.error("Ошибка при добавлении vanHostId в hostVans пользователя:", error);
        }
    } else {
        console.log("hostId уже существует в hostVans пользователя");
    }
}


export async function changeUserinfo(newUserInfo) {
    console.log(newUserInfo)
    const docRef = doc(database, "users", newUserInfo.id )

    const docSnap = await getDoc(docRef, newUserInfo)
    const userData = docSnap.data()

    userData.name = newUserInfo.name
    userData.email = newUserInfo.email
    userData.password = newUserInfo.password

    await setDoc(docRef, userData)
}

export async function getHostVans() {
    const user = JSON.parse(localStorage.getItem("user"))
    const userHostVans = user.hostVans
    const arrayUserHostVansElements = await Promise.all(userHostVans.map(async (van) => {
        const q = query(vansCollectionRef, where("hostId", "==", van))
        const snapshot = await getDocs(q)
        const vans = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        return vans
    }))
    const flattenedArray = arrayUserHostVansElements.reduce((acc, curr) => [...acc, ...curr], [])
    return flattenedArray
}