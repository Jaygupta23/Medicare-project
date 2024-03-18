import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import { tostE, tostS } from '../../toast/Toast';
import axios from 'axios';
import '../../styles/AuthStyles.css';

const ForgotPasswordVerifyOtp = () => {

    const [credentials, setCredentials] = useState({ email: "", n_password: "", c_password: "", otp: "" });
    let { email, n_password, c_password, otp } = credentials;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            if (n_password !== c_password) {
                tostE("Password didn't Match");
            }
            else {
                const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/verify-otp-for-reset-password`, credentials);

                if (response.data.success) {
                    tostS("Password Reset Successfully");
                    navigate("/login");
                }
                else {
                    tostE(response.data.message);
                }
            }

        } catch (error) {
            tostE(error.response.data.message)
        }


    }
    return (
        <Layout title={"Forgot Password - Ecommerce app"}>
            <div style={{ "margin-top": "5rem" }} >
                <div className=" form-container" >
                    <form onSubmit={handleSubmit}>
                        <h1 className='title'>RESET PASSWORD</h1>

                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" name='email' placeholder='Email address' value={email} aria-describedby="emailHelp" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="n_password" name="n_password" placeholder='New Password' value={n_password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="c_password" name="c_password" placeholder='Confirm Password' value={c_password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control" id="otp" name="otp" placeholder='OTP' value={otp} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Reset Password</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPasswordVerifyOtp
