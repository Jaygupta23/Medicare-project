import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { tostS } from '../toast/Toast';
import { useCart } from '../context/Cart';
import "../styles/CategoryProductStyle.css";

const CategoryProduct = () => {
    const [products, setProducts] = useState();
    const [category, setCategory] = useState();
    const {cart, setCart} = useCart();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.slug) getProductByCat();
    }, [params.slug])
    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = async (p) => {
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, p]));
        tostS("Item Added to Cart")
    }
    return (
        <Layout>
            <div style={{ marginTop: "5rem" }} >
                <div className="container mt-3 category">
                    {category && <>
                        <h4 className="text-center">Category - {category[0].name}</h4>
                        <h6 className="text-center">{products.length} result found</h6>
                        <div className="">
                            <div className="col-md-10 offset-1">
                                <h1 className='ms-2'>All Products</h1>
                                <div className="container d-flex flex-wrap">

                                    {products?.map((p, i) => (
                                        <div className="card m-2" style={{ width: "18rem" }} key={i}>
                                            <img src={p.photo} alt={p.name} className="card-img-top" />
                                            <div className="card-body">
                                                <div className="card-name-price">
                                                    <h5 className="card-title">{p.name}</h5>
                                                    <p className="card-title card-price"> $ {p.price}</p>
                                                </div>
                                                <p className="card-text">{p.description.substring(0, 30)}</p>
                                                <div className="card-name-price">
                                                    <button className="btn btn-info ms-1" onClick={() => navigate(`/product/${p._id}`)} >More Details</button>
                                                    <button className="btn btn-dark ms-1" onClick={() => addToCart(p)}>Add to cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </Layout >
    )
}

export default CategoryProduct
