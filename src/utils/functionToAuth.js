import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, db, provider } from '@/config/firebase'
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';

const notifySignIn = () => toast('Succsess Sign In!');
const notifySignOut = () => toast('Succsess Sign Out!');
/* 
export const handleSignIn = async (user) => {
    const userToAddRef = collection(db, 'users');
    await signInWithPopup(auth, provider);
    if (user) {
        await addDoc(userToAddRef, user);
    }
    console.log(user);

    notifySignIn();
} */

export const handleSignOut = async (setUserData) => {
    await signOut(auth);
    setUserData(null);
    notifySignOut();
}