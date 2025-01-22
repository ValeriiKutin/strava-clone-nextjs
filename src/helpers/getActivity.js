import { db } from "@/config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const activityRef = query(collection(db, 'activity'), orderBy("dateTime", 'desc'));

export const getActivity = async (setListActivity) => {
    const data = await getDocs(activityRef);
    setListActivity((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
}