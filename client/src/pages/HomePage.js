import React, { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import axios from "axios";
import { Checkbox } from "antd";
import { Prices } from "../component/Price";
import { Radio } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import NormalSpinner from "../component/NormalSpinner";
import { useNavigate } from "react-router-dom";
import { tostS } from "../toast/Toast";
import { useCart } from "../context/Cart";
import { useDispatch, useSelector } from "react-redux";
// import { cart } from "../redux/action-creators/index";
import slide1 from "../images/slider1.jpg";
import slide2 from "../images/slider2.jpg";
import slide3 from "../images/slider3.jpg"
import slide4 from "../images/slider4.webp"
import slide5 from "../images/slider5.webp";
import "../styles/Homepage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const {cart, setCart} = useCart();
  const dispatch = useDispatch();
  const value = useSelector((state) => state.CartReducer.cart);
  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
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
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setPage(page + 1);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch more data
  const fetchMoreData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setPage(page + 1);
      if (data?.success) {
        setProducts(products.concat(data.products));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );

      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(total, "total");

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
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
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      if (data?.success) {
        if(data.products)
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
// console.log(products.length,"length-------------");
  const addToCart = async (p) => {
    setCart([...cart, p]);
    dispatch(cart([...value, p]));
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
    tostS("Item Added to Cart");
  };

  return (
    <Layout title={"All Products - Best Offers"} >
      <div >
        {/* banner image */}
        {/* <img
                    src={slide1}
                    className="banner-img"
                    alt="bannerimage"
                    width={"100%"} height={"800px"}
                /> */}
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
          
        >
          <div className="carousel-inner" >
            <div className="carousel-item active" data-bs-interval="10000">
              <img src={slide1} className="d-block w-100 " height={"800px"}  alt="..." />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={slide2} className="d-block w-100 "  height={"800px"} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={slide3} className="d-block w-100 "  height={"800px"} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={slide4} className="d-block w-100 "  height={"800px"} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={slide5} className="d-block w-100 "  height={"800px"} alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* banner image */}
        <div className="row home-page row m-3 filters mt-5">
          <div className="col-md-3">
            <h4 className="text-center pb-3">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c, i) => (
                <Checkbox style={{marginLeft: "10px"}}
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h4 className="text-center mt-4 pb-2">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p, i) => (
                  <div key={p._id}>
                    <Radio value={p.array}> Rs {p.name} </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column my-4">
              <button
                className="btn btn-danger rounded-2"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9 mt-2">
            <h1 className="text-center">All Products</h1>
            <InfiniteScroll
              dataLength={products.length}
              next={fetchMoreData}
              hasMore={products.length > total}
              loader={<NormalSpinner />}
            >  
              <div className="d-flex flex-wrap justify-content-center">
                {products?.map((p, i) => (
                  // <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                  <div className="card m-2" style={{ width: "20rem" }} key={i}>
                    <img src={p.photo} alt={p.name} className="card-img-top" />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title w-75">{p.name.substring(0, 15)}</h5>
                        <h5 className="card-title card-price"> Rs {p.price}</h5>
                      </div>
                      <p className="card-text">
                        {p.description.substring(0, 30)}
                      </p>
                      <div className="card-name-price">
                        <button
                          className="btn btn-primary rounded-2 me-1"
                          onClick={() => navigate(`/product/${p._id}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-danger ms-1 rounded-2"
                          onClick={() => addToCart(p)}
                        >
                          Add to cart
                        </button>
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
    </Layout>
  );
};

export default HomePage;

// {
//     Prices.map(p => (
//         <div key={p._id}>
//             <Radio value={p.array}> {p.name} </Radio>
//         </div>
//     ))
// }
