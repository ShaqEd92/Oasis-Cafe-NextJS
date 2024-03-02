"use client";

import { useState } from "react";

import PersonalInput from "../ui/checkout/personal-input";
import ShippingInput from "../ui/checkout/shipping-input";

const Page = () => {

    const [personalInformation, setPersonalInformation] = useState({
        name: "",
        email: "",
    });
    const [shippingInformation, setShippingInformation] = useState({
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "US",
    });
    const [shippingSelectedValue, setShippingSelectedValue] = useState("");

    const handleShippingSelect = (event) => {
        setShippingSelectedValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //ToDo Collect FormData save into State (create store for DeliveryInfo)
        //ToDo Route to payment page
    };

    return (
        <form className="delivery-form" onSubmit={handleSubmit}>
            <PersonalInput
                personalInfo={personalInformation}
            />
            <ShippingInput
                shippingInfo={shippingInformation}
                selectedValue={shippingSelectedValue}
                handleSelect={handleShippingSelect}
            />
            <div className="go-checkout-button">
                <button type="submit">Proceed to Payment &#10095;</button>
            </div>
        </form>
    );
};

export default Page;