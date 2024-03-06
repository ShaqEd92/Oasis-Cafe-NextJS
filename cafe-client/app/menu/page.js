"use client";

import Image from "next/image";

import { coffeeMenu } from "../../data/inventory";
import { useCartItemsStore } from "../../store/cart";

const Page = () => {

    const cartItems = useCartItemsStore((state) => state.cartItems)
    const addCartItem = useCartItemsStore((state) => state.add);
    const editCartItem = useCartItemsStore((state) => state.edit);

    const handleClick = (item) => {
        let isInCart = cartItems.filter((_item) => _item.name === item.name)
        if (isInCart.length === 0) {
            addCartItem(item)
        } else {
            editCartItem(item.name, isInCart[0].quantity + 1);
        }
    };

    return (
        <div className="menu-page">
            <div className="menu-items">
                {coffeeMenu.map((item, key) => (
                    <div key={key}>
                        <h2>{item.name}</h2>
                        <button onClick={() => handleClick(item)}>
                            <Image
                                src={`/menu-${item.name}.png`}
                                alt={item.name}
                                width={250}
                                height={250}
                            />
                        </button>
                        <p>${item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
