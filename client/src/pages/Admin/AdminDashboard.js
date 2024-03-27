import React from 'react'
import Layout from './../../component/Layout/Layout';
import AdminMenu from '../../component/Layout/AdminMenu';
import { useAuth } from '../../context/Auth';

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"Admin Dashboard"}>
            <div style={{ marginTop: "7rem", backgroundColor: "linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%)" }} >
                <div className="m-3 p-3" >
                    <div className="row">
                        <div className="col-md-3 px-5">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9 mt-5">
                            <div className="card w-75 p-3">
                                <h3>Admin Name: {auth?.user?.name}</h3>
                                <h3>Admin Email: {auth?.user?.email}</h3>
                                <h3>Admin Contact: {auth?.user?.phone}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
