"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddressElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import { useLoginStore, useUserStore } from "../../../store/user";
import { useDeliveryStore } from "../../../store/delivery";
import { addAddress } from "../../../api/userApi";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const loggedIn = useLoginStore((state) => state.loggedIn);
    const user = useUserStore((state) => state.user);
    const deliveryInfo = useDeliveryStore((state) => state.deliveryInfo);

    const [disabled, setDisabled] = useState(false);
    const [errors, setErrors] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true)

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded or elements not available
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (result.error) {
            setDisabled(false);
            setErrors(result.error.message)
        } else {
            if (loggedIn)
                addAddress({ stripeId: user.stripeId, address: { ...deliveryInfo } })
            router.push(`/success/${result.paymentIntent.id}`)
        }
    };

    return (
        <div className='w-full flex justify-center p-3'>
            <form className='bg-white rounded-lg shadow-lg p-5 flex flex-col justify-center items-center w-5/6 md:w-1/2' onSubmit={handleSubmit}>
                {errors &&
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full" role="alert">
                        <div className="w-11/12 flex justify-center align-center text-center flex-col">
                            <strong>{errors}</strong>
                            <p className="">Please try again or contact your bank for additional information.</p>
                        </div>
                        <span className="absolute top-0 bottom-0 right-0 px-1 py-1">
                            <button type="button" onClick={() => setErrors("")} className="text-red-700">
                                <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.896l-2.651 2.953a1.2 1.2 0 1 1-1.697-1.697L8.303 10 5.651 7.348a1.2 1.2 0 1 1 1.697-1.697L10 8.303l2.651-2.652a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </button>
                        </span>
                    </div>
                }
                {/* <AddressElement className='w-full' options={{
                    mode: "billing"
                }} /> */}
                <PaymentElement className='w-full mt-4' />
                {(stripe && elements) &&
                    <button
                        type="submit"
                        disabled={disabled}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out mt-4 w-1/4">
                        Pay
                    </button>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;

