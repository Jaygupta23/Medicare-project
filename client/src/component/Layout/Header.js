import React, {  useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import { useAuth } from "../../context/Auth";
import { tostS } from "../../toast/Toast";
import SearchInput from "../forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";
import { useCart } from "../../context/Cart";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { HiShoppingBag } from "react-icons/hi2";
const Header = () => {
  const {toggle, setToggle} = useCart()
  const [auth, setAuth] = useAuth();
  const {cart} = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    tostS("Logout Successfully");
  };

  return (
    <div >
      <nav
        className="navbar navbar-expand-lg fixed-top "
        style={{ backgroundColor: "#0A9A73", height:"65px"}}
      >
        <div className="container-fluid" style={{ backgroundColor: "#0A9A73", width: "100vw"}}>
        <Link className="navbar-brand text-light fs-2 d-lg-none">
              <FaHouseChimneyMedical className="fs-1 pb-2" />
              MediCare
            </Link>
          <button
            className="navbar-toggler position-sticky"
            style={{top: "10px" , right: "20px",backgroundColor: "#0A9A73", }}
            type="button"
            onClick={()=> setToggle(!toggle)}
            
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon fs-7" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01" >
            <Link className="navbar-brand text-light d-none d-lg-block fs-2">
              <FaHouseChimneyMedical className="fs-1 pb-2" />
              MediCare
            </Link>
            <div className="mx-auto mt-4 mt-lg-0 mb-2 mb-lg-0">
              <SearchInput className="d-md-none d-lg-block" />
            </div>
            <ul className="navbar-nav  mb-2 mb-lg-0 ">
              <li className="nav-item mx-2">
                <NavLink
                  className="nav-link text-light fw-bolder"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown mx-2">
                <Link
                  className="nav-link dropdown-toggle text-light"
                  to={"/categories"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item ">
                    <NavLink className="nav-link text-light" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-light " to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown mx-2">
                    <NavLink
                      className="nav-link dropdown-toggle text-light"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth.user.role === 1 ? "admin" : "user"
                          } `}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="">
                        <NavLink
                          onClick={handleLogout}
                          className="dropdown-item"
                          to="/login"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item me-4">
                <NavLink className="nav-link mx-2" to="/cart">
                  <Badge
                    className="text-light "
                    count={cart?.length}
                    showZero
                    offset={[10, -5]}
                  >
                    <HiShoppingBag className="fs-4" />
                  </Badge>
                </NavLink>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
