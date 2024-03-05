"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from 'clsx';

import { customerPaymentMethods } from "../../../api/paymentApi";
import { useUserStore } from "../../../store/user";
import { useCartItemsStore } from "../../../store/cart";
import { prepareQuickPayment } from "../../../api/paymentApi"

const Page = () => {

    const router = useRouter();

    const user = useUserStore((state) => state.user);
    const cartItems = useCartItemsStore((state) => state.cartItems)

    const [paymentMethods, setPaymentMethods] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [emptyAddresses, setEmptyAddresses] = useState(null);
    const [emptyPaymentMethods, setEmptyPaymentMethods] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (user) {
            customerPaymentMethods(user.stripeId).then(({ data }) => {
                setPaymentMethods(data.paymentMethods.data)
                if (data.paymentMethods.data.length === 1)
                    setSelectedPaymentMethod(data.paymentMethods.data[0].id)
                else if (data.paymentMethods.data.length === 0)
                    setEmptyPaymentMethods(true)
            })
        } else {
            router.push("/checkout")
        }
    }, [user, router]);

    useEffect(() => {
        if (user) {
            if (user.deliveryAddresses === 0)
                setEmptyAddresses(0)
        }
    }, [user]);

    const handleCharge = () => {
        setIsDisabled(true);
        const obj = {
            customerId: user.stripeId,
            deliveryInfo: user.deliveryAddresses[selectedAddress],
            email: user.email,
            cart: cartItems,
            paymentMethod: selectedPaymentMethod
        }
        prepareQuickPayment(obj).then(({ data }) => {
            router.push(`/success/${data.paymentIntent.id}`)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <div style={{ flex: 4, height: '65vh' }} className="bg-darker mr-2 pt-4 px-6 rounded-md overflow-auto flex flex-col">
                <div style={{ flex: 2 }} className="overflow-auto">
                    <h3 className="text-lighter jose text-xl font-bold">Select delivery address:</h3>
                    <div className="flex flex-row">
                        {user &&
                            user.deliveryAddresses.map((address, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedAddress(i)}
                                    className={clsx(`mt-4 bg-lighter mr-2 rounded-md p-2 cursor-pointer hover:bg-white`,
                                        { 'bg-primary hover:bg-primary': i === selectedAddress }
                                    )}
                                >
                                    <div>
                                        <p>
                                            {address.line1}{address.line2 && `, ${address.line2}`}
                                        </p>
                                        <p>
                                            {address.city},&nbsp;
                                            {address.state}&nbsp;
                                            {address.postal_code}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        {emptyAddresses &&
                            <p className="text-primary jose mt-2 italic text-xl">
                                Looks like you don&apos;t have any saved delivery addresses.&nbsp;
                                <Link className="text-light hover:text-lighter" href={"/checkout"}>Go to regular checkout.</Link>
                            </p>
                        }
                    </div>
                </div>
                <div style={{ flex: 2 }}>
                    <h3 className="text-lighter jose text-xl font-bold">Select payment method:</h3>
                    <div className="flex flex-row">
                        {paymentMethods &&
                            paymentMethods.map((p, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedPaymentMethod(p.id)}
                                    className={clsx(`mt-4 bg-lighter w-1/3 rounded-md p-2 text-center cursor-pointer hover:bg-white`,
                                        { 'bg-contrast hover:bg-primary': p.id === selectedPaymentMethod }
                                    )}
                                >
                                    {p.card.brand.toUpperCase()} ending in {p.card.last4}
                                </div>
                            ))}
                        {emptyPaymentMethods &&
                            <p className="text-primary jose mt-2 italic text-xl">
                                Looks like you don&apos;t have any saved payment methods.&nbsp;
                                <Link className="text-light hover:text-lighter" href={"/checkout"}>Go to regular checkout.</Link>
                            </p>
                        }
                    </div>
                </div>
                <div style={{ flex: 1 }} className="flex justify-center items-center w-full">
                    {(selectedAddress !== null && selectedPaymentMethod) &&
                        <button disabled={isDisabled} onClick={() => handleCharge()} className="bg-primary text-lighter px-6 py-2 rounded-md text-xl">PAY</button>
                    }
                </div>
            </div>
        </>
    );
};

export default Page;
