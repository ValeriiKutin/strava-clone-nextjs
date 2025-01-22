import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const updatingFirebaseData = async (id, setCurrentData) => {
    const docRef = doc(db, 'activity', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        setCurrentData(docSnap.data())
    }
}