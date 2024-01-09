import {
    getFirestore, 
    collection, 
    doc, 
    getDocs, 
    getDoc, 
    query,
    where, 
    addDoc
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
    try{ 
        await addDoc(usersCollectionRef, item,)
        console.log("Регестрация прошла успешно!")
    } catch (error) {
        console.log("Ошибка при добавлении нового объекта:", error);
    }
}

export async function getUser(email, password) {
    const snapshot = await getDocs(usersCollectionRef)
    const users = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    const user = users.filter(u => {
        return u.email == email && u.password == password 
    })
    return user
}


export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }
    
    return data
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

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}



/* 
This 👇 isn't normally something you'd need to do. Instead, you'd 
set up Firebase security rules so only the currently logged-in user 
could edit their vans.

https://firebase.google.com/docs/rules

I'm just leaving this here for educational purposes, as it took
me a while to find the `documentId()` function that allows you
to use a where() filter on a document's ID property. (Since normally
it only looks at the data() properties of the document, meaning you
can't do `where("id", "==", id))`

It also shows how you can chain together multiple `where` filter calls
*/

// export async function getHostVan(id) {
//     const q = query(
//         vansCollectionRef,
//         where(documentId(), "==", id),
//         where("hostId", "==", "123")
//     )
//     const snapshot = await getDocs(q)
//     const vans = snapshot.docs.map(doc => ({
//         ...doc.data(),
//         id: doc.id
//     }))
//     return vans[0]
// }
