import { create } from 'zustand'

export const useLoginStore = create((set) => ({
    loggedIn: false,
    logIn: () => set(() => ({ loggedIn: true })),
    logOut: () => set(() => ({ loggedIn: false })),
}));

export const useUserStore = create((set) => ({
    user: null,
    logUserIn: (userObject) => set(() => ({ user: userObject })),
    logUserOut: () => set(() => ({ user: null })),
}));
