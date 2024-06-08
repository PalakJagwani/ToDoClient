import { useSelector, connect } from "react-redux";
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import {isUserAuthenticated} from '../store.js/slice/authSlice'

function PrivateRoute() {
    const isuserAuthenticated = useSelector(isUserAuthenticated)

    console.log(isuserAuthenticated);
    return isuserAuthenticated ? (
        <>
        <Header />
        <Outlet />
        </>
    ) : (
    <Navigate replace to={"/login"} />
    );
}

export default PrivateRoute;
