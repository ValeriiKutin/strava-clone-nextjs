import { db } from "@/config/firebase";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";

export const queryUserByUid = async (uid) => {
    if (!uid) {
        console.error("UID is undefined");
        return null;
    }

    try {
        const userRef = query(collection(db, 'users'), where('uid', '==', uid));
        const userSnapshot = await getDocs(userRef);
        return userSnapshot;
    } catch (error) {
        console.error("Error querying user by UID: ", error);
        return null;
    }
}

export const checkUserExists = async (uid) => {
    const userSnapshot = await queryUserByUid(uid);
    return userSnapshot ? userSnapshot.empty : false;
}

export const getCurrentDataUser = async (uid, setUserData) => {
    const userSnapshot = await queryUserByUid(uid);
    if (userSnapshot && !userSnapshot.empty) {
        setUserData(userSnapshot.docs[0].data());
    }
}

/* Updation Func */

export const updateUserData = async (uid, nameDataUpdate, dataForUpdateUser) => {
    const userSnapshot = await queryUserByUid(uid);

    if (!userSnapshot.empty) {
        const userDocRef = userSnapshot.docs[0].ref;
        await updateDoc(userDocRef, {
            [nameDataUpdate]: dataForUpdateUser
        })
    } else {
        console.log('User not found');
    }

    window.location.reload();
}