"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CiFaceMeh } from "react-icons/ci";
import { FaBoltLightning } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

import { formatter } from "../../data/functions";
import { useLoginStore } from "../../store/user"
import { useCartItemsStore } from "../../store/cart"

const Page = () => {

    const cartItems = useCartItemsStore((state) => state.cartItems)

    return (
        <>
            {cartItems.length > 0 ? (
                <FullCart cartItems={cartItems} />
            ) : (
                <EmptyCart />
            )}
        </>
    );
};

const FullCart = ({ cartItems }) => {

    const loggedIn = useLoginStore((state) => state.loggedIn);
    const editCartItem = useCartItemsStore((state) => state.edit);
    const removeCartItem = useCartItemsStore((state) => state.remove);

    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [diffTo25, setDiffTo25] = useState(0);

    useEffect(() => {
        sumTotal();
        setDiffTo25(25 - total);
    }, [cartItems, diffTo25, total]);

    const sumTotal = () => {
        setTotal(0);
        setTotalItems(0);
        cartItems.map((item) =>
            setTotal((prevTotal) => prevTotal + item.price * item.quantity)
        );
        cartItems.map((item) => setTotalItems((prevTotal) => prevTotal + item.quantity));
    };

    const adjustQuantity = (item, adjustment) => {
        if (adjustment === 0) {
            removeCartItem(item)
            return;
        }
        if (item.quantity === 1 && adjustment === -1) {
            removeCartItem(item)
            return;
        }
        editCartItem(item.name, item.quantity + adjustment);
    };

    return (
        <div className="cart-page">
            <main>
                <div className="cart-items">
                    {cartItems.map((item, key) => (
                        <div key={key} className="single-cart-item">
                            <div className="cart-item-image">
                                <Image
                                    src={`/menu-${item.name}.png`}
                                    alt={item.name}
                                    width={150}
                                    height={150}
                                />
                            </div>
                            <p>{item.name}</p>
                            <p>
                                ${item.price} x {item.quantity}
                            </p>
                            <span className="cart-item-actions">
                                <button
                                    className="item-plus"
                                    onClick={() => adjustQuantity(item, 1)}
                                >
                                    +
                                </button>
                                <button
                                    className="item-minus"
                                    onClick={() => adjustQuantity(item, -1)}
                                >
                                    &#8212;
                                </button>
                                <button
                                    className="item-delete"
                                    onClick={() => adjustQuantity(item, 0)}
                                >
                                    Delete
                                </button>
                            </span>
                        </div>
                    ))}
                </div>
                <section>
                    <div className="cart-overview">
                        {total < 25 && (
                            <>
                                <p className="text-center">
                                    <FaInfoCircle size={20} className="inline mr-2 text-primary" />
                                    Add <span>{formatter.format(diffTo25)}</span> more to your
                                    coffee cart to qualify for FREE delivery.
                                </p>
                                <br />
                            </>
                        )}
                        <h3>
                            Subtotal ({totalItems} items): {formatter.format(total)}
                        </h3>
                        <br />
                        <Link href="/checkout">Proceed to checkout</Link>
                        {loggedIn && (
                            <Link href="/quick-checkout" id="quickCheckoutButton">
                                <FaBoltLightning />
                                QUICK CHECKOUT
                            </Link>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};


const EmptyCart = () => (
    <div className="cart-page">
        <div className="empty-cart">
            <CiFaceMeh size={150} color="gray" />
            <h1>Your coffee cart is empty.</h1>
        </div>
    </div>
);

export default Page;
