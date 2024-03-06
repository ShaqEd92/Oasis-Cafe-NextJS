import { create } from 'zustand';

export const useInfoStore = create((set) => ({
    personalInfo: {
        name: "",
        email: "",
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
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
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