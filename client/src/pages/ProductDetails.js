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
    const {cart, setCart} = useCart();
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
        const newCart = [...cart, p]
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        tostS("Item Added to Cart")
    }
    
    return (
        <Layout>
            <div style={{ marginTop: "5rem" }} >
                {product &&
                    <>
                        <div className='container'>
                        <div className="row  product-details mb-5">
                            <div className="col-md-5 my-auto pt-5">
                                <img className='card-img=top img-fluid' src={product.photo} alt={product.name} />
                            </div>
                            <div className="col-md-6 offset-1 mt-5">
                                <h1 className='text-center pb-4'>Product Details</h1>
                                <h6 className='my-3'><strong>Name:</strong> {product.name}</h6>
                                <h6 className='my-3'><strong>Description:</strong> {product.description}</h6>
                                <h6 className='my-3'><strong>Price:</strong> Rs {product.price}</h6>
                                <h6 className='my-3'> <strong>Category:</strong> {product.category.name}</h6>
                                <button className="btn btn-success fw-semibold ms-1 my-3" onClick={() => addToCart(product)}>ADD TO CART</button>
                            </div>
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
                                        <p className="card-title card-price"> Rs {p.price}</p>
                                    </div>
                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                    <div className="card-name-price">
                                        <button className="btn btn-primary text-light mx-1 " onClick={() => navigate(`/product/${p._id}`)} >More Details</button>
                                        <button className="btn btn-success ms-1 " onClick={() => addToCart(p)} >Add to cart</button>
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
