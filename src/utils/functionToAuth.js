import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '@/config/firebase'
export const handleSign = async () => {
    await signInWithPopup(auth, provider);
}

export const handleSignOut = async (setUserData) => {
    await signOut(auth);
    setUserData(null);
}