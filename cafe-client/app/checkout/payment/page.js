"use client";

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '../../ui/checkout/checkout-form';
import { useLoginStore, useUserStore } from "../../../store/user";
import { useCartItemsStore } from "../../../store/cart";
import { useInfoStore, useDeliveryStore } from "../../../store/delivery";
import { preparePayment } from "../../../api/paymentApi"

const stripePromise = loadStripe('pk_test_51Oh0efFnerTQfkDcjvmG9PPh22TQp8F7YZU7LSOOQo9hP3347yvtLVHu7DdWJeSUECAdWptAXjihw6oPX5JPbzRs008MOz1FmT');

const Page = () => {
    const [clientSecret, setClientSecret] = useState("");

    const loggedIn = useLoginStore((state) => state.loggedIn);
    const user = useUserStore((state) => state.user);

    const personalInfo = useInfoStore((state) => state.personalInfo);
    const deliveryInfo = useDeliveryStore((state) => state.deliveryInfo);

    const cartItems = useCartItemsStore((state) => state.cartItems)

    useEffect(() => {
        const customerId = loggedIn ? user.stripeId : "guest";
        const paymentRequest = { cartItems, customerId, personalInfo, deliveryInfo }
        preparePayment(paymentRequest).then((response) => {
            setClientSecret(response.data.client_secret)
        })
    }, [loggedIn, user, cartItems, personalInfo, deliveryInfo]);

    const appearance = {
        labels: 'floating'
    };

    const options = {
        clientSecret: clientSecret,
        appearance: appearance
    };

    return clientSecret ? (
        <section className="checkout-form">
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </section>
    ) : (
        <section className="checkout-form"></section>
    );
};

export default Page;