import React from 'react'
import Layout from '../../component/Layout/Layout'
import { useAuth } from '../../context/Auth'
import UserMenu from './../../component/Layout/UserMenu';

const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"User Dashboard"}>
            <div style={{ "margin-top": "5rem" }} >
                <div className="container-fluid m-3 p-3" >
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card w-75 p-3">
                                <h3>User Name: {auth?.user?.name}</h3>
                                <h3>User Email: {auth?.user?.email}</h3>
                                <h3>User Contact: {auth?.user?.phone}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
