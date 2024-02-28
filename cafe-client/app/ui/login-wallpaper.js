"use client"

import Image from "next/image";

const LoginWallpaper = () => (
    <div className="background-image">
        <span className="q1"></span>
        <span className="q2"></span>
        <span className="q3">
            <Image
                src="/logo.png"
                alt="coffee cup logo"
                width={500}
                height={500}
            />
        </span>
        <span className="q4"></span>
    </div>
);

export default LoginWallpaper;
