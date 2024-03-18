import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { Outlet } from 'react-router-dom'
import Spinner from "../Spinner";
import { tostE } from "../../toast/Toast";

export const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {

            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);

                if (res.data.ok) {
                    setOk(true);
                }
                else {
                    setOk(false);
                }
            } catch (error) {
                tostE(error.response.data.message);
            }


        }

        if (auth?.token) authCheck();

    }, [auth?.token]);
    return ok ? <Outlet /> : <Spinner path="" />
}



