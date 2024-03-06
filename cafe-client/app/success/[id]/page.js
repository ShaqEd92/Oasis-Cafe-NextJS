"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useCartItemsStore } from "../../../store/cart";
import { getPaymentInfo } from "../../../api/paymentApi"
import { formatter } from "../../../data/functions"
import Link from "next/link";

const Page = () => {

    const pathname = usePathname();

    const emptyCart = useCartItemsStore((state) => state.removeAll);

    const [ready, setReady] = useState(false)
    const [resultObject, setResultObject] = useState({})

    useEffect(() => {
        emptyCart()
        let id = pathname.replace("/success/", "")
        getPaymentInfo(id).then((response) => {
            const { paymentIntent } = response.data;
            const { paymentMethod } = response.data;
            setResultObject({
                amount: paymentIntent.amount / 100,
                orderId: paymentIntent.metadata.orderId,
                delivery: { ...paymentIntent.shipping.address },
                brand: paymentMethod.card.brand,
                last4: paymentMethod.card.last4
            })
            setReady(true);
        })
    }, [pathname])


    return ready ? (
        <div className="transaction-results-page">
            <div className="bg-lighter flex flex-col tex max-w-sm rounded overflow-hidden shadow-lg">
                <div className="flex items-center justify-center w-full px-6 py-4">
                    <h2 className="fred text-contrast font-semibold text-xl mb-2 text-center">
                        Thanks for your support!
                    </h2>
                </div>
                <div className="px-6 py-4">
                    <p className="font-bold mb-2 text-lg underline">
                        Your order details
                    </p>
                    <p>
                        <span className="font-bold">Order ID:</span>
                        <span className="text-contrast">&nbsp;{resultObject.orderId}</span>
                    </p>
                    <div className="mt-4">
                        <p className="font-bold">Delivering to:</p>
                        <div>
                            <p>
                                {resultObject.delivery.line1}{resultObject.delivery.line2 && `, ${resultObject.delivery.line2}`}
                            </p>
                            <p>
                                {resultObject.delivery.city},&nbsp;
                                {resultObject.delivery.state}&nbsp;
                                {resultObject.delivery.postal_code}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <p id="orderResults">
                        Final total of<span>&nbsp;{formatter.format(resultObject.amount)}&nbsp;</span>
                        charged to<span>&nbsp;{resultObject.brand}&nbsp;</span>
                        ending in<span>&nbsp;{resultObject.last4}</span>.
                    </p>
                </div>
                <div className="flex items-center justify-center w-full px-6 py-4">
                    <Link href="/menu" className="fred text-primary">
                        Buy more coffee!
                    </Link>
                </div>
            </div>
        </div>
    ) : null
}

export default Page