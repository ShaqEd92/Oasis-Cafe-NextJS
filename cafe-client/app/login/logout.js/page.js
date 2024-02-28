import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { logOut } from "../../redux/actions/userActions";

const LogOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default LogOut;
