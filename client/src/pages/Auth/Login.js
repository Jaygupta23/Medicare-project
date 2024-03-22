import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import { useNavigate, useLocation } from 'react-router-dom';
import { tostE, tostS } from '../../toast/Toast';
import axios from 'axios';
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/Auth';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let { email, password } = credentials;
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, credentials);

            if (response.data.success) {
                tostS("Login Successfully");
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(response.data));
                navigate(location.state || "/");
            }
            else {
                tostE(response.data.message);
            }

        } catch (error) {
            tostE(error.response.data.message)
        }


    }

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            navigate("/");
        }
    }, []);
    return (
        <Layout title={"Login - Ecommerce app"}>
            <div style={{ "margin-top": "5rem" }} >
                <div className=" form-container" >
                    <form onSubmit={handleSubmit}>
                        <h1 className='title'>LOGIN FORM</h1>

                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" name='email' placeholder='Email address' value={email} aria-describedby="emailHelp" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" name="password" placeholder='Password' value={password} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <div className="forgot-btn text-primary fw-medium text-end mt-2">
                            <b onClick={() => { navigate('/forgot-password-send-otp') }} >Forgot Password</b>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login
