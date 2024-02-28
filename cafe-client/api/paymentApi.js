import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const createCharge = (charge) =>
  axios.post(`${BASE_URL}/charge`, charge);

// CUSTOMER

export const customerCreate = (customer) =>
  Promise.resolve(axios.post(`${BASE_URL}/customer-create`, customer));

export const customerRetrieve = (id) =>
  Promise.resolve(axios.get(`${BASE_URL}/customer-retrieve/${id}`));

export const customerUpdate = (id, customer) =>
  Promise.resolve(axios.put(`${BASE_URL}/customer-update/${id}`, customer));

export const customerDelete = (id) =>
  Promise.resolve(axios.delete(`${BASE_URL}/customer-delete/${id}`));

// PAYMENT METHOD

export const paymentMethodCreate = (paymentMethod) =>
  axios.post(`${BASE_URL}/payment-create`, paymentMethod);

export const paymentMethodRetrieve = (token) =>
  axios.get(`${BASE_URL}/payment-retrieve/${token}`);

export const paymentMethodUpdate = (token, paymentMethod) =>
  axios.put(`${BASE_URL}/payment-update/${token}`, paymentMethod);

export const paymentMethodDelete = (token) =>
  axios.delete(`${BASE_URL}/payment-delete/${token}`);

  // SUBSCRIPTION

export const subscriptionCreate = (subscription) =>
Promise.resolve(axios.post(`${BASE_URL}/subscription-create`, subscription));

export const subscriptionRetrieve = (id) =>
axios.get(`${BASE_URL}/subscription-retrieve/${id}`);

export const subscriptionUpdate = (id, subscription) =>
axios.put(`${BASE_URL}/subscription-update/${id}`, subscription);

export const subscriptionDelete = (id) =>
axios.delete(`${BASE_URL}/subscription-delete/${id}`);