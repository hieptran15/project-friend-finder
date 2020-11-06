import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useAuth} from "../components/Auth"

function PrivateRoute(props) {
  const Cmd=props.component;
  let auth=JSON.parse(localStorage.getItem('aulogin'))
  let userId=JSON.parse(localStorage.getItem('userId'))
  // console.log(auth)
  return (
    <div>{auth? <Cmd/>: <Redirect to="/"/>}</div>
  );
}

export default PrivateRoute;