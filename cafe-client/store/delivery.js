import { create } from 'zustand';

export const useInfoStore = create((set) => ({
    personalInfo: {
        name: "Test",
        email: "test@email.com",
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
        line1: "123 Main St",
        line2: "Apt. 4",
        city: "Chicago",
        state: "IL",
        postal_code: "60606",
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