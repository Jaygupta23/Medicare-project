import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { tostS } from '../toast/Toast';
import { useCart } from '../context/Cart';
import "../styles/ProductDetailStyle.css";

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState();
    const [relatedProduct, setRelatedProduct] = useState();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.id}`);
            if (data?.success) {
                setProduct(data?.product);
                getSimilarProduct(data?.product._id, data?.product.category._id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line
    }, [params.id])

    // get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            if (data?.success) {
                setRelatedProduct(data?.products);
            }
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
            <div style={{ "margin-top": "5rem" }} >
                {product &&
                    <>
                        <div className="row container mt-2 product-details">
                            <div className="col-md-6">
                                <img className='card-img=top' src={product.photo} alt={product.name} />
                            </div>
                            <div className="col-md-6 ">
                                <h1 className='text-center'>Product Details</h1>
                                <h6>Name: {product.name}</h6>
                                <h6>Description: {product.description}</h6>
                                <h6>Price: {product.price}</h6>
                                <h6>Category: {product.category.name}</h6>
                                <button className="btn btn-secondary ms-1" onClick={() => addToCart(product)}>ADD TO CART</button>
                            </div>
                        </div>
                        <hr /> </>}

                <div className="row container similar-products" >
                    <h6>Similar product ➡️</h6>
                    <div className="d-flex flex-wrap">

                        {relatedProduct?.length < 1 && (
                            <p className="text-center">No Similar Product Found</p>
                        )}
                        {relatedProduct?.map((p, i) => (
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
                                        <button className="btn btn-dark ms-1" onClick={() => addToCart(p)} >Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            </div>
        </Layout >
    )
}

export default ProductDetails
