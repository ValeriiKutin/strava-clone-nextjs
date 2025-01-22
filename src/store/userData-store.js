import { getLocation } from "@/helpers/getCurrentLocation";
import { create } from "zustand";


export const useUserDataStore = create((set) => ({
    dataUser: null,
    listActivity: [],
    searchActivity: '',
    locationUser: null,
    activeFiledId: null,
    nameSettings: {
        firstName: '',
        lastName: ''
    },
    birthdaySettings: {
        month: '',
        day: '',
        year: ''
    },
    genderSettings: '',
    locationSettings: '',
    weightSettings: '',

    setUserData: (dataUser) => set({ dataUser }),

    setLocationUser: async () => {
        getLocation().then((location) => {
            set({ locationUser: location });
        })
    },

    setActiveFiledId: (activeFiledId) => set(state => ({
        activeFiledId: state.activeFiledId === activeFiledId ? null : activeFiledId
    })),
    setListActivity: (listActivity) => set({ listActivity }),
    setSearchActivity: (searchActivity) => set({ searchActivity }),

    /*nameSettings*/
    setFirstName: (firstName) => set(state => ({
        nameSettings: { ...state.nameSettings, firstName }
    })),
    setLastName: (lastName) => set(state => ({
        nameSettings: { ...state.nameSettings, lastName }
    })),
    /*nameSettings*/

    /*birthdaySettings*/
    setMonth: (month) => set(state => ({
        birthdaySettings: { ...state.birthdaySettings, month }
    })),
    setDay: (day) => set(state => ({
        birthdaySettings: { ...state.birthdaySettings, day }
    })),
    setYear: (year) => set(state => ({
        birthdaySettings: { ...state.birthdaySettings, year }
    })),
    /*birthdaySettings*/

    /*genderSettings*/
    setGender: (genderSettings) => set({ genderSettings })
    /*genderSettings*/
}));









/* setUserData: (user) => {
    const newDataUser = user?.providerData?.[0] || null;
    set((state) => ({
        dataUser: { ...newDataUser, location: state.locationUser }
    }));
}, */