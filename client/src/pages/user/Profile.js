import React, { useEffect, useState } from 'react'
import UserMenu from '../../component/Layout/UserMenu'
import Layout from '../../component/Layout/Layout'
import { useAuth } from '../../context/Auth'
import { tostE, tostS } from '../../toast/Toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    // context
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    // state
    const [credentials, setCredentials] = useState({ name: "", email: "", phone: "", address: "", password: "", cpassword: "" });
    let { name, email, phone, address, password, cpassword } = credentials;


    // get user data 
    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setCredentials({ name: name, email: email, phone: phone, address: address });
    }, [auth?.user]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {

        e.preventDefault();
        if (password !== cpassword) {
            tostE("Password Didn't Match");
        }
        else {
            try {
                const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, credentials);
                if (data?.error) {
                    tostE(data?.message);
                } else {
                    setAuth({ ...auth, user: data?.updatedUser });
                    let ls = localStorage.getItem("auth");
                    ls = JSON.parse(ls);
                    ls.user = data.updatedUser;
                    localStorage.setItem('auth', JSON.stringify(ls));
                    tostS("Profile Updated Successfully");
                    navigate("/cart")

                }

            } catch (error) {
                tostE(error.response.data.message)
            }
        }

    }

    return (
        <Layout title={"Your Profile"}>
            <div style={{ "marginTop": "5rem" }} >
                <div className="container-fluid m-3 p-3" >
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <div className=" form-container" >
                                <form onSubmit={handleSubmit}>
                                    <h1 className='title'>USER PROFILE</h1>
                                    <div className="mb-3">
                                        <input type='name' className="form-control" id="name" name='name' placeholder='Name' value={name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" id="email" name='email' placeholder='Email address' value={email} aria-describedby="emailHelp" onChange={handleChange} required disabled />
                                    </div>
                                    <div className="mb-3">
                                        <input type='number' className="form-control" id="phone" name='phone' placeholder='Phone no.' value={phone} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type='text' className="form-control" id="address" name='address' placeholder='Address' value={address} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" id="password" name="password" placeholder='Password' value={password} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder='Confirm Password' value={cpassword} onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">UPDATE</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
