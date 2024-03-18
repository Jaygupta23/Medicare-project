import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import { tostE, tostS } from '../../toast/Toast';
import axios from 'axios';
import '../../styles/AuthStyles.css';

const ForgotPasswordSendOtp = () => {

    const [email, setEmail] = useState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();


        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/otp-for-reset-password`, {
                email: email
            });

            if (response.data.success) {
                tostS("OTP Send Successfully");
                navigate("/forgot-password-verify-otp");
            }
            else {
                tostE(response.data.message);
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
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPasswordSendOtp
