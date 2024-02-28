import { create } from 'zustand'

export const useLoginStore = create((set) => ({
    loggedIn: false,
    logIn: () => set(() => ({ loggedIn: true })),
    logOut: () => set(() => ({ loggedIn: false })),
}));

export const useUserStore = create((set) => ({
    user: null,
    logIn: () => set(() => ({ user: api.getUser() })),
    logOut: () => set(() => ({ user: null })),
}));
