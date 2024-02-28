import axios from "axios";

const BASE_URL = "http://localhost:5000/users/";

export const register = (user) => axios.post(BASE_URL + "register", user);

export const login = (user) => axios.post(BASE_URL + "login", user);

export const addSubscription = (user, id) => {
console.log(user, id)
  axios.put(BASE_URL + `subscription/${user}/${id}`);
}
