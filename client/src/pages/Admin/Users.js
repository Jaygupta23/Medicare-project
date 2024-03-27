import React from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'

const Users = () => {
    return (
        <Layout title={"Dashboard - All Users"}>
            <div style={{ marginTop: "7rem" }} >
                <div className="container-fluid" >
                    <div className="row">
                        <div className="col-md-3 px-5">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9 px-5">
                            <h1 className='text-center'>All Users</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
