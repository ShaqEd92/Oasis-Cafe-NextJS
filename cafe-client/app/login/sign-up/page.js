"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { customerCreate } from "../../../api/paymentApi";
import { useLoginStore } from "../../../store/user";

const Page = ({ origin, changeView, close }) => {

  // let history = useHistory();
  const loggedIn = useLoginStore((state) => state.loggedIn);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    braintreeID: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (newUser.braintreeID === "")
      setNewUser({ ...newUser, braintreeID: generateCustomerID() });
    if (loggedIn) {
      origin === "login"
        ? history.push("/menu")
        : history.push("/subscribe");
    }
    else {
      setErrors([...errors, "Registration failure. Please try again."]);
    }
  }, [newUser, loggedIn, errors, history, origin]);

  const generateCustomerID = () => {
    const selection =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789";
    let id = "User-";
    for (let i = 0; i < 7; i++) {
      id += selection[Math.floor(Math.random() * 62)];
    }
    return id;
  };

  const formIsValid = () => {
    let _errors = [];
    for (let [key, val] of Object.entries(newUser)) {
      if (!val.trim()) {
        _errors.push(key);
      }
    }
    if (!passwordsMatch) _errors.push("Passwords do not match.");
    setErrors(_errors);
    return _errors.length === 0;
  };

  const handleChange = ({ target }) => {
    setErrors("");
    setNewUser({ ...newUser, [target.name]: target.value });
  };

  const handleConfirm = ({ target }) => {
    if (target.value === newUser.password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
    setConfirmPassword(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    customerCreate(newUser)
    dispatch(registerUser(newUser));
    if(origin === "subscribe") close();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{`Create An Oasis Caf\u00E9 Account`}</h2>
      <div widths="equal">
        <input
          fluid
          error={
            errors.includes("firstName")
              ? { content: "Please enter your first name", pointing: "above" }
              : null
          }
          label="First name"
          placeholder="First name"
          name="firstName"
          value={newUser.firstName}
          onChange={handleChange}
        />
        <input
          fluid
          error={
            errors.includes("lastName")
              ? { content: "Please enter your last name", pointing: "above" }
              : null
          }
          label="Last name"
          placeholder="Last name"
          name="lastName"
          value={newUser.lastName}
          onChange={handleChange}
        />
      </div>
      <input
        fluid
        error={
          errors.includes("email")
            ? { content: "Please enter an email address", pointing: "above" }
            : null
        }
        label="Email"
        type="email"
        placeholder="example@email.com"
        name="email"
        value={newUser.email}
        onChange={handleChange}
      />
      <div widths="equal">
        <input
          fluid
          error={
            errors.includes("password")
              ? { content: "Please enter a password", pointing: "above" }
              : null
          }
          label="Password"
          type="password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          name="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <input
          fluid
          error={
            !passwordsMatch
              ? { content: "Passwords do not match", pointing: "above" }
              : null
          }
          label="Confirm Password"
          type="password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          value={confirmPassword}
          onChange={handleConfirm}
        />
      </div>
      <button>Register</button>
      <div>
        {origin === "login" ? (
          <Link to="/login/sign-in">Already have an account?</Link>
        ) : (
          <button id="loginSwitch" onClick={changeView}>
            Already have an account?
          </button>
        )}
      </div>
    </form>
  );
};

export default Page;
