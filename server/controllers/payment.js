import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRICES = {
    COFFEE: 2.50,
    LATTE: 3,
    MOCHA: 3.5,
    TEA: 1.5
}

const getPrice = (name) => {
    let val = name.toUpperCase();
    let price = PRICES[val];
    return price;
}

export const generateOrderID = () => {
    const selection =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
        id += selection[Math.floor(Math.random() * 62)];
    }
    return id;
};

const calculateFinalAmount = (cart) => {
    let subTotal = 0;
    cart.map((item) => subTotal += (getPrice(item.name) * item.quantity));

    let shipping = subTotal > 25 ? 0 : 5;
    let tax = (subTotal + shipping) * 0.1025;
    let total = subTotal + shipping + tax;
    let finalAmount = Math.round(total * 100)

    return finalAmount;
}

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
    }
}

export const getPaymentInfo = async (req, res) => {
    const paymentIntentId = req.params.id;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);

    res.json({ paymentIntent: paymentIntent, paymentMethod: paymentMethod });
}