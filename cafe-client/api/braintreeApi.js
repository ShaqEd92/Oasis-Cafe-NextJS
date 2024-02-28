import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const generateClientToken = () =>
  axios.get(`${BASE_URL}/generate-client-token`);

export const transactionSale = (transaction) =>
  axios.post(`${BASE_URL}/transaction-sale`, transaction);

export const transactionSale2 = (transaction) =>
  axios.post(`${BASE_URL}/transaction-sale-2`, transaction);

// SUBSCRIPTION

export const subscriptionCreate = (subscription) =>
  Promise.resolve(axios.post(`${BASE_URL}/subscription-create`, subscription));

export const subscriptionFind = (id) =>
  axios.get(`${BASE_URL}/subscription-find/${id}`);

export const subscriptionUpdate = (id, subscription) =>
  axios.put(`${BASE_URL}/subscription-update/${id}`, subscription);

export const subscriptionDelete = (id) =>
  axios.delete(`${BASE_URL}/subscription-delete/${id}`);

// CUSTOMER

export const customerCreate = (customer) =>
  Promise.resolve(axios.post(`${BASE_URL}/customer-create`, customer));

export const customerFind = (id) =>
  Promise.resolve(axios.get(`${BASE_URL}/customer-find/${id}`));

export const customerUpdate = (id, customer) =>
  Promise.resolve(axios.put(`${BASE_URL}/customer-update/${id}`, customer));

export const customerDelete = (id) =>
  Promise.resolve(axios.delete(`${BASE_URL}/customer-delete/${id}`));

// PAYMENT METHOD

export const paymentMethodCreate = (paymentMethod) =>
  axios.post(`${BASE_URL}/payment-create`, paymentMethod);

export const paymentMethodFind = (token) =>
  axios.get(`${BASE_URL}/payment-find/${token}`);

export const paymentMethodUpdate = (token, paymentMethod) =>
  axios.put(`${BASE_URL}/payment-update/${token}`, paymentMethod);

export const paymentMethodDelete = (token) =>
  axios.delete(`${BASE_URL}/payment-delete/${token}`);
