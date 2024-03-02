"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FormInput from "../../ui/form-input";
import { login } from "../../../api/userApi";
import { useLoginStore, useUserStore } from "../../../store/user"

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

    const formIsValid = (loginUser) => {
        let _errors = [];
        for (let [key, val] of Object.entries(loginUser)) {
            if (!val.trim()) {
                _errors.push(key);
            }
        }
        setErrors(_errors);
        return _errors.length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);

        let loginUser = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        if (!formIsValid(loginUser)) {
            setLoading(false);
            return;
        }

        // Fetch User saved in MongoDB => save into state 
        login(loginUser).then((response) => {
            logIn();
            const { password, ...userState } = response.data;
            logUserIn(userState);
        }).catch((err) => {
            if (err.response.request.status === 404) {
                setLoading(false);
                setError("Email or password is incorrect");
            }
        })

    };

    return (
        <>
            <h1 className="mb-2 font-bold">{`Oasis Caf\u00E9`}</h1>
            <form onSubmit={handleSubmit}>
                <div className="jose text-contrast text-center mb-2 text-xl font-semibold">{error}</div>
                <FormInput
                    error={errors.includes("email") ? "Please enter your email address" : null}
                    label="Email (Username)"
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                />
                <FormInput
                    error={errors.includes("password") ? "Please enter your password" : null}
                    label="Password"
                    type="password"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    name="password"
                />
                <div className="flex items-center justify-center">
                    <button disabled={loading} type="submit">
                        {loading &&
                            <div className="animate-spin rounded-full h-4 w-4 border-b-4 border-gray-900 mr-4"></div>
                        }
                        {loading ? `Signing you in...` : `Sign in`}
                    </button>
                </div>
                <div className="flex justify-center">
                    <Link href="/login/sign-up" className="login-switch">Don&apos;t Have An Account?</Link>
                </div>
            </form>
        </>
    );
};

export default Page;
