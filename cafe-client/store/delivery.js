import { create } from 'zustand';

export const useInfoStore = create((set) => ({
    personalInfo: {
        name: "Bruce Wayne",
        email: "bruce@gotham.net",
    },
    create: (info) => set(() => ({
        personalInfo: {
            name: info.name,
            email: info.email
        }
    })),
}));

export const useDeliveryStore = create((set) => ({
    deliveryInfo: {
        line1: "1007 Mountain Drive",
        line2: "Wayne Manor",
        city: "Gotham",
        state: "NJ",
        postal_code: "12345",
        country: "US",
    },
    create: (info) => set(() => ({
        deliveryInfo: {
            line1: info.line1,
            line2: info.line2,
            city: info.city,
            state: info.state,
            postal_code: info.postal_code,
            country: "US",
        }
    })),
}));