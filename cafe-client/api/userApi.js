import axios from "axios";
import dotenv from "dotenv";

dotenv.config()

const BASE_URL = process.env.BASE_URL

export const register = (user) => axios.post(`${BASE_URL}/register`, user);

export const login = (user) => axios.post(`${BASE_URL}/login`, user);

export const addAddress = (address) => axios.post(`${BASE_URL}/add-address`, address);
