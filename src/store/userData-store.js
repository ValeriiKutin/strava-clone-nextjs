import { create } from "zustand";


export const useUserDataStore = create((set) => ({
    dataUser: null,

    setUserData: (user) => {
        const newDataUser = user?.providerData?.[0] || null;
        set({ dataUser: newDataUser });
    },
}));