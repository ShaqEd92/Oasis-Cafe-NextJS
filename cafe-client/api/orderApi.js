import axios from "axios";

const BASE_URL = "https://localhost:5000/orders";

export const saveOrder = (order) => axios.post(BASE_URL, order);

export const getOrders = (id) => axios.post(BASE_URL + id);
