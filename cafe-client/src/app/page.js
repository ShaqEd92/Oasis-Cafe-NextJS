import Image from "next/image";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/logo.png";

const HomePage = () => {
  const loggedIn = useSelector((state) => state.loggedIn);

  return (
    <div className="home-page">
      <div className="branding">
        <span className="title">
          <h1>Oasis</h1>
          <h1>{`Caf\u00E9`}</h1>
        </span>
        <img src={logo} alt="logo" />
      </div>
      <p className="tag-line">Coffee brought to your doorsteps</p>
      <div className="navigation">
        <Link to="/menu">Menu</Link>
        <Link to="/subscribe">Subscriptions</Link>
        {!loggedIn && <Link to="/login/sign-in">Sign In</Link>}
      </div>
    </div>
  );
};

export default HomePage;
