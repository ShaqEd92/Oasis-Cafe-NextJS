import { create } from 'zustand'

export const useUserStore = create((set) => ({
    user: null,
    logIn: () => set(() => ({ user: api.getUser() })),
    logOut: () => set(() => ({ user: null })),
}));
