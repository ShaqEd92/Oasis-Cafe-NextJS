"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FormInput from "../../ui/form-input"
import { customerCreate } from "../../../api/paymentApi";
import { register } from "../../../api/userApi";
import { useLoginStore } from "../../../store/user";

const Page = ({ origin, changeView, close }) => {

  const router = useRouter();

  const loggedIn = useLoginStore((state) => state.loggedIn);
  const logIn = useLoginStore((state) => state.logIn);

  const [newUser, setNewUser] = useState({});
  const [errors, setErrors] = useState([]);

  const ref = useRef(null);

  // TODO Conditional roouting based on how login modal accessed
  // useEffect(() => {
  //   if (loggedIn) {
  //     origin === "login"
  //       ? history.push("/menu")
  //       : history.push("/subscribe");
  //   }
  //   else {
  //     setErrors([...errors, "Registration failure. Please try again."]);
  //   }
  // }, [loggedIn, errors, origin]);

  const formIsValid = (userObject) => {
    let _errors = [];
    for (let [key, val] of Object.entries(userObject)) {
      if (!val.trim()) {
        _errors.push(key);
      }
    }
    if (userObject.password !== userObject.confirmPassword) _errors.push("Passwords do not match.");
    setErrors(_errors);
    return _errors.length === 0;
  };

  const handleSubmit = async (event) => {
    // TODO Immediately enable loading visual of some sort
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let userObject = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    }

    setNewUser(userObject)
    if (!formIsValid(userObject)) return;

    customerCreate(userObject).then((response) => {
      if (response.status === 200) {
        let user = {
          ...userObject,
          stripeId: response.data.id
        }
        register(user).then((response) => {
          if (response.status === 201) { 
            logIn(true)
            router.push("/menu")
          } else {
            // TODO Create div to display this error
            // TODO Also, delete Stripe user if mongoDB user not successfully created
            setErrors("Looks like something went wrong...")
          }
        })
      }
      else {
        setErrors("Looks like something went wrong...")
      }
    })

    // TODO Conditional roouting based on how login modal accessed
    // if (origin === "subscribe") close();
  };

  return (
    <>
      <h1 className="mb-2 font-bold">{`Oasis Caf\u00E9`}</h1>
      <form ref={ref} onSubmit={handleSubmit}>
        <FormInput
          error={errors.includes("firstName") ? "Please enter your first name" : null}
          label="First name"
          type="text"
          placeholder="First name"
          name="firstName"
        />
        <FormInput
          error={errors.includes("lastName") ? "Please enter your last name" : null}
          label="Last name"
          type="text"
          placeholder="Last name"
          name="lastName"
        />
        <FormInput
          error={errors.includes("email") ? "Please enter an email address" : null}
          label="Email"
          type="email"
          placeholder="example@email.com"
          name="email"
        />
        <FormInput
          error={errors.includes("password") ? "Please enter password" : null}
          label="Password"
          type="password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          name="password"
        />
        <FormInput
          error={errors.includes("Passwords do not match.") ? "Passwords do not match" : null}
          label="Confirm Password"
          type="password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          name="confirmPassword"
        />
        <div className="flex items-center justify-center">
          <button type="submit">Register</button>
        </div>
        <div className="flex justify-center">
          {origin === "login" ? (
            <Link to="/login/sign-in">Already have an account?</Link>
          ) : (
            <button id="loginSwitch" onClick={changeView} type="button">
              Already have an account?
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Page;
