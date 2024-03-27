import React, { useState, useEffect } from 'react'
import Layout from '../../component/Layout/Layout';
import AdminMenu from '../../component/Layout/AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tostE } from '../../toast/Toast';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/index'

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    // const [upId, setUpId] = usePid();
    const dispatch = useDispatch();
    const { epId } = bindActionCreators(actionCreators, dispatch);

    // get all products

    const getAllProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);

            if (data?.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
            tostE(error.response.data.message);
            // tostE(error);
        }
    }

    useEffect(() => {
        getAllProduct();
    }, [])

    const handleClick = (e) => {
        // setUpId(e._id);
        // localStorage.setItem("upId", e._id);
        epId(e._id);
        navigate(`/dashboard/admin/product/${e._id}`);

    }

    return (
        <Layout>
            <div className='container-fluid' style={{ marginTop: "7rem" }} >
                <div className="row" >
                    <div className="col-md-3 px-5 mb-4">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 px-3">
                        <h1 className='text-center'>All Products List</h1>
                        <div className="d-flex flex-wrap justify-content-center">
                            {products?.map((p) => (
                                <div key={p._id} onClick={() => handleClick(p)} className='product-link ' style={{ "cursor": 'pointer' }}>
                                    <div className="card m-2" style={{ width: "18rem" }}>
                                        <img src={p.photo} alt={p.name} className="card-img-top" height="300px" />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name.substring(0, 20)}</h5>
                                            <p className="card-text">{p.description.substring(0, 32)}</p>
                                            <p className="card-text fw-semibold text-success fs-5   "> Rs {p.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products






