"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FormInput from "../../ui/form-input";
import { customerCreate, customerDelete } from "../../../api/paymentApi";
import { register } from "../../../api/userApi";
import { useLoginStore, useUserStore } from "../../../store/user";

const Page = () => {

  //ToDo Conditional routing based on how login modal accessed

  const router = useRouter();

  const loggedIn = useLoginStore((state) => state.loggedIn);
  const logIn = useLoginStore((state) => state.logIn);
  const logUserIn = useUserStore((state) => state.logUserIn);

  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedIn) router.push("/menu")
  }, [router, loggedIn]);

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
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    
    let userObject = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    }

    if (!formIsValid(userObject)) {
      setLoading(false);
      return;
    }

    // Create Stripe Customer
    customerCreate(userObject).then((response) => {
      let user = {
        ...userObject,
        stripeId: response.data.id
      }
      // Create customer user in MongoDB
      register(user).then((response) => {
        const { password, confirmPassword, ...userState } = user;
        logIn()
        logUserIn(userState)
      }).catch((err) => {
        //ToDo Immediately delete Stripe user if MongoDB user not successfully created
        customerDelete(user.stripeId)
        setLoading(false);
        setError(err.response.data.message)
      })
    }).catch((err) => {
      setLoading(false);
      setErrors("Looks like something went wrong...")
    })
  };

  return (
    <>
      <h1 className="mb-2 font-bold">{`Oasis Caf\u00E9`}</h1>
      <form onSubmit={handleSubmit}>
        <div className="jose text-contrast text-center mb-2 text-xl font-semibold">{error}</div>
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
          label="Email (Username)"
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
          <button disabled={loading} type="submit">
            {loading &&
              <div className="animate-spin rounded-full h-4 w-4 border-b-4 border-gray-900 mr-4"></div>
            }
            {loading ? `Creating your account...` : `Register`}
          </button>
        </div>
        <div className="flex justify-center">
          <Link href="/login/sign-in" className="login-switch">Already have an account?</Link>
        </div>
      </form>
    </>
  );
};

export default Page;
