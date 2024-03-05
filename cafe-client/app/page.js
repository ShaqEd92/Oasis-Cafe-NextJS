"use client"

import Image from "next/image";
import Link from 'next/link'

import { useLoginStore } from "../store/user"

const Page = () => {
  const loggedIn = useLoginStore((state) => state.loggedIn);

  return (
    <div className="home-page">
      <div className="branding">
        <span className="title">
          <h1>Oasis</h1>
          <h1>{`Caf\u00E9`}</h1>
        </span>
        <div className="branding-img">
          <Image
            src="/logo.png"
            alt="coffee cup logo"
            width={500}
            height={500}
          />
        </div>
      </div>
      <p className="tag-line">Coffee brought to your doorsteps</p>
      <div className="navigation">
        <Link href="/menu">Menu</Link>
        {/* <Link href="/subscribe">Subscriptions</Link> */}
        {!loggedIn &&
          <Link href="/login/sign-in">Sign In</Link>
        }
      </div>
    </div>
  );
};

export default Page;
