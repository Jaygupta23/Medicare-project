import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/Auth'
import Layout from '../component/Layout/Layout'
import { tostE, tostS } from '../toast/Toast'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react"
import axios from 'axios'

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    // const value = useSelector((state) => state.CartReducer.cart);
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
            tostS("Item removed successfully");
        } catch (error) {
            console.log(error);
            tostE("Item not deleted");
        }
    }

    const totalPrice = () => {
        let total = 0;
        cart.map(item => {
            total = total + item.price
        });

        return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }

    // get payment gateway token 
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token])

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart });
            setLoading(true);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            tostS("Payment Completed Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <Layout>
            <div style={{ "marginTop": "5rem" }} >
                <div className="container cart-page" >
                    <div className="row">
                        <div className="col-md-12">

                            <h1 className='text-center bg-light p-2 mb-1'>
                                {!auth?.user
                                    ? "Hello Guest"
                                    : `Hello ${auth?.token && auth?.user?.name}`}
                                <p className="text-center">
                                    {cart?.length > 0
                                        ? `You Have ${cart?.length} items in your cart ${auth?.token ? "" : "Please login to checkout !"
                                        }`
                                        : "Your Cart is Empty"}
                                </p>
                            </h1>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row mt-4">
                            <div className="col-md-7 p-0 me-3">
                                {cart?.map((p) => (
                                    <div className="row card flex-row mb-4" key={p._id}>
                                        <div className="col-md-4">
                                            <img src={p.photo} alt={p.name} className="card-img-top" height={"200px"} />
                                        </div>
                                        <div className="col-md-8">
                                            <p style={{ "fontSize": "1.2rem" }}>{p.name}</p>
                                            <p style={{ "fontSize": "1.2rem" }}>{p.description.substring(0, 30)}</p>
                                            <p style={{ "fontSize": "1.2rem" }}>Price : $ {p.price}</p>
                                            <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="col-md-4 cart-summary text-center">
                                {cart?.length > 0 ? <>
                                    <h2>Card Summary</h2>
                                    <p>Total | Checkout | Payment</p>
                                    <hr />
                                    <h4>Total : {totalPrice()} </h4>
                                    {auth?.user?.address ? (
                                        <>
                                            <div className="mb-3">
                                                <h4>Current Address</h4>
                                                <h5>{auth?.user?.address}</h5>
                                                <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")} >Update Address</button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mb-3">

                                            {auth?.token ? (
                                                <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}  >Update Address</button>
                                            ) : (
                                                <button className="btn btn-outline-warning" onClick={() => navigate("/login", { state: "/cart", })} >Please Login to Checkout</button>
                                            )}
                                        </div>
                                    )}

                                    <div className="mt-2">
                                        {!clientToken || !auth?.token || !cart?.length ? (
                                            ""
                                        ) : (
                                            <>

                                                <DropIn
                                                    options={{
                                                        authorization: clientToken,
                                                        paypal: {
                                                            flow: "vault",
                                                        },
                                                    }}
                                                    onInstance={(instance) => setInstance(instance)}
                                                />

                                                <button className="btn btn-primary"
                                                    onClick={handleSubmit}
                                                    disabled={loading || !instance || !auth?.user?.address}>
                                                    {loading ? "Processing" : "Make Payment"}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </> :
                                    <></>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
