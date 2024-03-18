import React, { useState, useEffect } from 'react'
import Layout from '../component/Layout/Layout'
import axios from 'axios';
import { Checkbox } from "antd";
import { Prices } from '../component/Price';
import { Radio } from 'antd';
import InfiniteScroll from "react-infinite-scroll-component";
import NormalSpinner from '../component/NormalSpinner';
import { useNavigate } from 'react-router-dom';
import { tostS } from '../toast/Toast';
import { useCart } from '../context/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { cart } from '../redux/action-creators/index';
import '../styles/Homepage.css';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [carti, setCarti] = useCart();
    const dispatch = useDispatch();
    const value = useSelector((state) => state.CartReducer.cart);
    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data.category);

            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
        // eslint-disable-next-line
    }, []);

    // get all product 
    const getAllProduct = async () => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setPage(page + 1);
            if (data?.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
        }

    }

    // fetch more data 
    const fetchMoreData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setPage(page + 1);
            if (data?.success) {
                setProducts(products.concat(data.products));
            }
        } catch (error) {
            console.log(error);
        }
    }

    // get total product count 
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);

            if (data?.success) {
                setTotal(data?.total);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id)
        }
        else {
            all = all.filter(c => c !== id);
        }
        setChecked(all);
    }
    useEffect(() => {
        if (!checked.length && !radio.length) getAllProduct();
        // eslint-disable-next-line
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
        // eslint-disable-next-line
    }, [checked, radio]);


    // get filter product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio });
            if (data?.success) {
                setProducts(data?.products);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = async (p) => {

        setCarti([...carti, p]);
        dispatch(cart([...value, p]));
        localStorage.setItem("cart", JSON.stringify([...carti, p]));
        tostS("Item Added to Cart")
    }

    return (
        <Layout title={"All Products - Best Offers"}>
            <div >
                {/* banner image */}
                <img
                    src="/images/banner.png"
                    className="banner-img"
                    alt="bannerimage"
                    width={"100%"}
                />
                {/* banner image */}
                <div className=" container-fluid home-page row mt-3">
                    <div className="col-md-3 filters">
                        <h4 className="text-center">Filter By Category</h4>
                        <div className="d-flex flex-column">
                            {categories?.map((c, i) => (
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>

                        <h4 className="text-center mt-5">Filter By Price</h4>
                        <div className="d-flex flex-column">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {Prices?.map((p, i) => (
                                    <div key={p._id}>
                                        <Radio value={p.array} > {p.name} </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="d-flex flex-column mt-5">
                            <button className="btn btn-danger" onClick={() => window.location.reload()}>RESET FILTERS</button>
                        </div>


                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All Products</h1>
                        <InfiniteScroll
                            dataLength={products.length}
                            next={fetchMoreData}
                            hasMore={products.length < total}
                            loader={<NormalSpinner />}
                        >
                            <div className="d-flex flex-wrap">

                                {products?.map((p, i) => (
                                    // <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                    <div className="card m-2" style={{ width: "18rem" }} key={i}>
                                        <img src={p.photo} alt={p.name} className="card-img-top" />
                                        <div className="card-body">
                                            <div className="card-name-price">

                                                <h5 className="card-title">{p.name}</h5>
                                                <h5 className="card-title card-price"> $ {p.price}</h5>
                                            </div>
                                            <p className="card-text">{p.description.substring(0, 30)}</p>
                                            <div className="card-name-price">
                                                <button className="btn btn-info ms-1" onClick={() => navigate(`/product/${p._id}`)} >More Details</button>
                                                <button className="btn btn-dark ms-1" onClick={() => addToCart(p)}>Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                    // </Link>
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default HomePage




// {
//     Prices.map(p => (
//         <div key={p._id}>
//             <Radio value={p.array}> {p.name} </Radio>
//         </div>
//     ))
// }

