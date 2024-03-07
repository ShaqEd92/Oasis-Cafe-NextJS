import axios from "axios";
import dotenv from "dotenv";

dotenv.config()

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const preparePayment = (cart) => axios.post(`${BASE_URL}/prepare-payment`, cart);

export const getPaymentInfo = (id) => axios.get(`${BASE_URL}/payment-id/${id}`);

// CHARGE

export const prepareQuickPayment = (obj) => axios.post(`${BASE_URL}/prepare-quick-payment`, obj) 

// CUSTOMER

export const customerCreate = (customer) =>
  Promise.resolve(axios.post(`${BASE_URL}/customer-create`, customer));

export const customerRetrieve = (id) =>
  Promise.resolve(axios.get(`${BASE_URL}/customer-retrieve/${id}`));

export const customerUpdate = (id, customer) =>
  Promise.resolve(axios.put(`${BASE_URL}/customer-update/${id}`, customer));

export const customerDelete = (id) =>
  Promise.resolve(axios.delete(`${BASE_URL}/customer-delete/${id}`));

  export const customerPaymentMethods = (id) =>
  Promise.resolve(axios.get(`${BASE_URL}/customer-payments/${id}`));

// PAYMENT METHOD

export const paymentMethodCreate = (paymentMethod) =>
  axios.post(`${BASE_URL}/payment-create`, paymentMethod);

export const paymentMethodRetrieve = (id) =>
  axios.get(`${BASE_URL}/payment-retrieve/${id}`);

export const paymentMethodUpdate = (id, paymentMethod) =>
  axios.put(`${BASE_URL}/payment-update/${id}`, paymentMethod);

export const paymentMethodDetach = (id) =>
  axios.delete(`${BASE_URL}/payment-detach/${id}`);

  // SUBSCRIPTION

export const subscriptionCreate = (subscription) =>
Promise.resolve(axios.post(`${BASE_URL}/subscription-create`, subscription));

export const subscriptionRetrieve = (id) =>
axios.get(`${BASE_URL}/subscription-retrieve/${id}`);

export const subscriptionUpdate = (id, subscription) =>
axios.put(`${BASE_URL}/subscription-update/${id}`, subscription);

export const subscriptionDelete = (id) =>
axios.delete(`${BASE_URL}/subscription-delete/${id}`);