"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PersonalInput from "../ui/checkout/personal-input";
import ShippingInput from "../ui/checkout/shipping-input";
import { useInfoStore, useDeliveryStore } from "../../store/delivery";

const Page = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const personalInfo = useInfoStore((state) => state.personalInfo);
    const setPersonalInfo = useInfoStore((state) => state.create);
    const deliveryInfo = useDeliveryStore((state) => state.deliveryInfo);
    const setDeliveryInfo = useDeliveryStore((state) => state.create);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);

        let guestInfo = {
            name: formData.get('name'),
            email: formData.get('email'),
        }
        setPersonalInfo(guestInfo);
        let addressInfo = {
            line1: formData.get('line1'),
            line2: formData.get('line2'),
            city: formData.get('city'),
            state: formData.get('state'),
            postal_code: formData.get('postal_code'),
        }
        setDeliveryInfo(addressInfo);


        router.push("/checkout/payment")
    };

    return (
        <section className="checkout-form">
            <form className="delivery-form" onSubmit={handleSubmit}>
                <PersonalInput
                    personalInfo={personalInfo}
                />
                <ShippingInput
                    deliveryInfo={deliveryInfo}
                />
                <div className="go-checkout-button">
                    {!loading ?
                        <button type="submit">
                            Proceed to Payment &#10095;
                        </button>
                        :
                        <span className="animate-pulse">Collecting those details...</span>
                    }
                </div>
            </form>
        </section>
    );
};

export default Page;