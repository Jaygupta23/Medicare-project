import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import { tostE, tostS } from '../../toast/Toast';
import axios from 'axios';
import '../../styles/AuthStyles.css';

const Register = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", phone: "", address: "", password: "", cpassword: "" });
    let { name, email, phone, address, password, cpassword } = credentials;

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {

        e.preventDefault();
        if (password !== cpassword) {
            tostE("Password Didn't Match");
        }
        if(password && password.length < 6){
            tostE("Password should be 6 character long")
        }
        else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, credentials);

                if (response.data.success) {
                    tostS("Register Successfully");
                    navigate("/login")
                }

            } catch (error) {
                tostE(error.response.data.message)
            }
        }

    }
    return (
        <Layout title={"Register - Ecommerce app"}>
            <div style={{ "marginTop": "5rem" }} >
                <div className=" form-container" >
                    <form onSubmit={handleSubmit}>
                        <h1 className='title'>REGISTER FORM</h1>
                        <div className="mb-3">
                            <input type='name' className="form-control" id="name" name='name' placeholder='Name' value={name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" name='email' placeholder='Email address' value={email} aria-describedby="emailHelp" onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type='number' className="form-control" id="phone" name='phone' placeholder='Phone no.' value={phone} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type='text' className="form-control" id="address" name='address' placeholder='Address' value={address} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="password" name="password" placeholder='Password' value={password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder='Confirm Password' value={cpassword} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register
