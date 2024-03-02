"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CheckoutNavigation from "../ui/checkout/checkout-navigation";
import OrderSummary from "../ui/checkout/order-summary";

import { useCartItemsStore } from "../../store/cart";

const Layout = ({ children }) => {

    const router = useRouter();

    const cartItems = useCartItemsStore((state) => state.cartItems);

    const [cartTotal, setCartTotal] = useState(0)
    const [orderObject, setOrderObject] = useState({
        subTotal: 0,
        shipping: 0,
        savings: 0,
        tax: 0,
        total: 0,
    });

    useEffect(() => {
        if (cartItems.length === 0) router.push("/cart")
    }, [cartItems, router]);


    useEffect(() => {
        setCartTotal(0);
        let total = 0;
        cartItems.map((item) => total += (item.price * item.quantity));
        setCartTotal(total)
    }, [cartItems, setCartTotal]);

    useEffect(() => {
        let subTotal = cartTotal;
        let shipping = cartTotal > 25 ? 0 : 5;
        let tax = (cartTotal + shipping) * 0.1025;
        let total = subTotal + shipping + tax;
        setOrderObject({ subTotal, shipping, tax, total });
    }, [cartTotal]);

    return (
        <div id="checkoutPage">
            <CheckoutNavigation />
            <h1>Coffee Cart Checkout</h1>
            <main>
                <OrderSummary orderObject={orderObject} />
                <section className="checkout-form">
                    {children}
                </section>
            </main>
        </div>
    )
};

export default Layout;
