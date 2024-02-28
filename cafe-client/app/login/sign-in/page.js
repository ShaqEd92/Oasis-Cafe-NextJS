"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useLoginStore } from "../../../store/user"

const Page = ({ origin, changeView, close }) => {

    //! History
    //? https://stackoverflow.com/questions/56857880/how-to-get-history-and-match-in-this-props-in-nextjs  
    //  let history = useHistory();

    const loggedIn = useLoginStore((state) => state.loggedIn);

    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);

    //   useEffect(() => {
    //     if (loggedIn) {
    //       origin === "login"
    //         ? history.push("/menu")
    //         : history.push("/subscribe");
    //     }
    //     if (loginFailure) {
    //       setErrors([...errors, "Incorrect email or password."]);
    //       dispatch(resetLoginFailure());
    //     }
    //   }, [loggedIn, history, errors, dispatch, origin]);

    const formIsValid = () => {
        let _errors = [];
        for (let [key, val] of Object.entries(loginUser)) {
            if (!val.trim()) {
                _errors.push(key);
            }
        }
        setErrors(_errors);
        return _errors.length === 0;
    };

    const handleChange = ({ target }) => {
        setErrors("");
        setLoginUser({ ...loginUser, [target.name]: target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formIsValid()) return;
        dispatch(getUser(loginUser));
        if (origin === "subscribe") close();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{`Log in to Oasis Caf\u00E9`}</h2>
            <div>
                <input
                    fluid
                    error={
                        errors.includes("email")
                            ? {
                                content: "Please enter your email address",
                                pointing: "below",
                            }
                            : null
                    }
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={loginUser.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    fluid
                    error={
                        errors.includes("password")
                            ? { content: "Please enter your password", pointing: "below" }
                            : null
                    }
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    value={loginUser.password}
                    onChange={handleChange}
                />
            </div>
            <button>Sign in</button>
            <div>
                {origin === "login" ? (
                    <Link href="/login/sign-up">Don't Have An Account?</Link>
                ) : (
                    //   <button id="loginSwitch" onClick={changeView}>Don't Have An Account?</button>
                    <Link href="/login/sign-up">Don't Have An Account?</Link>
                )}
            </div>
        </form>
    );
};

export default Page;
