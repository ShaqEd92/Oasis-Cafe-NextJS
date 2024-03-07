import Stripe from "stripe";
import dotenv from "dotenv";

import { generateOrderID, calculateFinalAmount } from "../utils/functions.js"

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const preparePayment = async (req, res) => {
    const cart = req.body.cartItems;
    const customerId = req.body.customerId;
    const email = req.body.personalInfo.email;
    const shippingName = req.body.personalInfo.name;
    const shippingAddress = req.body.deliveryInfo;

    const amount = calculateFinalAmount(cart);
    const orderId = generateOrderID();

    if (customerId === "guest") {
        const paymentIntent = await stripe.paymentIntents.create({
            setup_future_usage: 'on_session',
            amount: amount,
            currency: 'usd',
            metadata: {
                orderId: orderId
            },
            receipt_email: email,
            shipping: {
                name: shippingName,
                address: shippingAddress
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.json({ client_secret: paymentIntent.client_secret });
    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            customer: customerId,
            setup_future_usage: 'off_session',
            amount: amount,
            currency: 'usd',
            metadata: {
                orderId: orderId
            },
            receipt_email: email,
            shipping: {
                name: shippingName,
                address: shippingAddress
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.json({ client_secret: paymentIntent.client_secret });
    }
}

export const prepareQuickPayment = async (req, res) => {
    const { customerId, deliveryInfo, email, cart, paymentMethod, name } = req.body;
    const shippingAddress = deliveryInfo;
    const amount = calculateFinalAmount(cart);
    const orderId = generateOrderID();
    try {
        const response = await stripe.paymentIntents.create({
            customer: customerId,
            setup_future_usage: 'off_session',
            amount: amount,
            currency: 'usd',
            metadata: {
                orderId: orderId
            },
            receipt_email: email,
            payment_method: paymentMethod,
            shipping: {
                name: name,
                address: shippingAddress
            },
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
        })
        const paymentIntent = await stripe.paymentIntents.confirm(response.id)
        res.json({ paymentIntent: paymentIntent });
    } catch (error) {
        res.json(error);
    }
};

export const getPaymentInfo = async (req, res) => {
    const paymentIntentId = req.params.id;
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);

        if (paymentMethod.customer) {
            try {
                await removeDuplicates(paymentMethod.customer, paymentMethod.card.fingerprint, paymentMethod.id);
                return res.json({ paymentIntent: paymentIntent, paymentMethod: paymentMethod });
            } catch (innerError) {
                console.error(innerError);
                return res.status(500).json({ error: 'An error occurred while removing duplicates' });
            }
        }
        return res.json({ paymentIntent: paymentIntent, paymentMethod: paymentMethod });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while retrieving payment information' });
    }
}

const removeDuplicates = async (customerId, fingerprint, paymentMethodId) => {
    const response = await stripe.customers.listPaymentMethods(customerId);
    const paymentMethods = response.data
    for (let i = 0; i < paymentMethods.length; i++) {
        if (paymentMethods[i].id === paymentMethodId)
            continue
        if (paymentMethods[i].card.fingerprint === fingerprint)
            stripe.paymentMethods.detach(paymentMethods[i].id);
    }
}