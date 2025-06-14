import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "./login_context";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { loadKhaltiScript } from "../utils/loadKhalti";

export default function ProtectedRouteLayout() {

    const nav = useNavigate();

    useEffect(() => {
        loadKhaltiScript();
    }, []);

    const user = useUser();


    if (user === undefined) {
        return <>checking token please wait</>;
    }

    if (user === null) {
        setTimeout(() => {
            return <>failed to check token
            </>
        }, 1000);

        nav("/")

    }


    return <>
        <Outlet />
        <ToastContainer />
    </>

}
