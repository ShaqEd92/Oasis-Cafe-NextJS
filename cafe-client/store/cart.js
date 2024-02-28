import { create } from 'zustand';

export const useCartItemsStore = create((set) => ({
    cartItems: [{
        name: "Coffee",
        price: "2.50",
        quantity: 3
    }],
    add: (newCartItem) => set((state) => ({
        cartItems: [...state.cartItems, newCartItem]
    })),
    edit: (itemName, quantity) => set((state) => ({
        cartItems: state.cartItems.map((item) => {
            if (item.name === itemName) {
                return { ...item, quantity: quantity };
            }
            return item;
        }),
    })),
    remove: (deletedCartItem) => set((state) => ({
        cartItems: state.cartItems.filter((cartItem) => deletedCartItem.name !== cartItem.name)
    })),
    removeAll: () => set({ cartItems: [] }),
}));