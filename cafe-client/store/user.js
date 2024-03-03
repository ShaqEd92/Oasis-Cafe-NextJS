import { create } from 'zustand'

export const useLoginStore = create((set) => ({
    loggedIn: true,
    logIn: () => set(() => ({ loggedIn: true })),
    logOut: () => set(() => ({ loggedIn: false })),
}));

export const useUserStore = create((set) => ({
    user: {
        firstName: "Bruce",
        lastName: "Wayne",
        email: "bruce@gotham.net",
        stripeId: "cus_PeUnyW3YGnox9V"
    },
    logUserIn: (userObject) => set(() => ({ user: userObject })),
    logUserOut: () => set(() => ({ user: null })),
}));
