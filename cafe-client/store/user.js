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
        stripeId: "cus_PeUnyW3YGnox9V",
        deliveryAddresses: [
            {
                name: "Bruce Wayne",
                line1: "1007 Mountain Drive",
                line2: "Wayne Manor",
                city: "Gotham",
                state: "NJ",
                postal_code: "12345",
                country: "US",
            }
        ]
    },
    logUserIn: (userObject) => set(() => ({ user: userObject })),
    logUserOut: () => set(() => ({ user: null })),
}));
