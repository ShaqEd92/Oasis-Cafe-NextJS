"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AddressElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [disabled, setDisabled] = useState(false);

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
            //ToDo Handle transaction failure
            setDisabled(false);
            console.log(result.error.message);
        } else {
            router.push(`/success/${result.paymentIntent.id}`)
        }
    };

    return (
        <div className='w-full flex justify-center p-3'>
            <form className='bg-white rounded-lg shadow-lg w-1/2 p-5 flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                <AddressElement className='w-full' options={{
                    mode: "billing"
                }} />
                <PaymentElement className='w-full mt-4' />
                <button
                    type="submit"
                    disabled={disabled}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out mt-4 w-1/4">
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;

