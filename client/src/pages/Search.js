import React from 'react'
import Layout from './../component/Layout/Layout';
import { useSearch } from '../context/Search';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { tostS } from '../toast/Toast';
import '../styles/Homepage.css';

const Search = () => {
    const navigate = useNavigate();
    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();

    const addToCart = async (p) => {
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, p]));
        tostS("Item Added to Cart")
    }
    return (
        <Layout title={'Search results'}>
            <div style={{ "margin-top": "5rem" }} >
                <div className="container home-page">
                    <div className="text-center mt-3" >
                        <h1>Search Results</h1>
                        <h6>{values?.results.length < 1 ? "No Product Found" : `Found ${values?.results.length}`}</h6>

                        <div className="d-flex flex-wrap mt-4">

                            {values?.results.map((p, i) => (
                                // <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
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
                                            <button className="btn btn-dark ms-1" onClick={() => addToCart(p)} > Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                                // </Link>
                            ))}
                        </div>
                    </div>
                </div >
            </div>
        </Layout >
    )
}

export default Search
