import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const customerCreate = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.firstName + " " + req.body.lastName,
      email: req.body.email,
    });
    res.json(customer);
  } catch (error) {
    res.json(error);
  }
};

export const customerRetrieve = async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve(req.params.id);
    res.json(customer);
  } catch (error) {
    res.json(error);
  }
};

export const customerUpdate = async (req, res) => {

};

export const customerDelete = async (req, res) => {
  try {
    const customer = await stripe.customers.del(req.params.id);
    res.json(customer);
  } catch (error) {
    res.json(error);
  }
};
