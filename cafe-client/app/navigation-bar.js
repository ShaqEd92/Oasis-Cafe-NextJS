"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLoginStore, useCartItemsStore } from "../store/cart"

const NavigationBar = () => {

  const pathname = usePathname()

  const [cartSize, setCartSize] = useState(0);

  const loggedIn = useLoginStore((state) => state.loggedIn);
  const cartItems = useCartItemsStore((state) => state.cartItems)

  useEffect(() => {
    setCartSize(0);
    cartItems.map((item) => setCartSize((prev) => prev + item.quantity));
  }, [cartItems]);

  return (
    <div className="outer-bar">
      <div className="inner-bar">
        <div className="img-holder">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="coffee cup logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="links">
          <Link href="/" id="webName">
            {`Oasis Caf\u00E9`}
          </Link>
          <Link href="/menu" className={`link ${pathname === "/menu" ? "nav-selected" : ""}`}>
            Menu
          </Link>
          {loggedIn && (
            <Link href="/payment-methods" className={`link ${pathname === "/payment-methods" ? "nav-selected" : ""}`}>
              Wallet
            </Link>
          )}
          <Link href="/subscribe" className={`link ${pathname === "/subscribe" ? "nav-selected" : ""}`}>
            Subscriptions
          </Link>
        </div>
        <div className="login-links">
          {!loggedIn && (
            <>
              <Link href="/login/sign-in">
                Sign in
              </Link>
              <Link href="/login/sign-up">
                Sign up
              </Link>
            </>
          )}
          {loggedIn && (
            <Link href="/logout">
              Sign out
            </Link>
          )}
          <Link href="/cart">
            <div className="coffee-cart">
              <Image
                src="/cart.png"
                alt="coffee cup logo"
                width={50}
                height={50}
              />
              <p>{cartSize > 0 && cartSize}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
