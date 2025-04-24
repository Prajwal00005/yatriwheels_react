import { Outlet } from "react-router-dom";
import { useUser } from "./login_context";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { loadKhaltiScript } from "../utils/loadKhalti";

export default function ProtectedRouteLayout() {

    useEffect(() => {
        loadKhaltiScript();
    }, []);

    const user = useUser();


    if (user === undefined) {
        return <>checking token plese wait</>;
    }

    if (user === null) {
        return <>failed to check token</>
    }


    return <>
        <Outlet />
        <ToastContainer />
    </>

}
