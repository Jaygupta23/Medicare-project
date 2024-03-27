import React, { useState, useEffect } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import { tostE, tostS } from '../../toast/Toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");
    const [first, setFirst] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    // get single product
    const getSingleProduct = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.id}`);
            setId(data.product._id);
            setName(data.product.name);
            setDescription(data.product.description);
            setCategory(data.product.category._id);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setPhoto(data.product.photo);
            setFirst(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleProduct();
        // eslint-disable-next-line
    }, [])


    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            tostE(error.response.data.message);
        }
    };

    useEffect(() => {
        getAllCategory();
        // eslint-disable-next-line
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);

            if (data?.success) {
                tostS("Product updated Successfully");
                navigate('/dashboard/admin/products');
            }
            else {
                tostE(data?.message);
            }


        } catch (error) {
            console.log(error);
            tostE(error.response.data.message);
        }
    }

    // delete a product
    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            // let answer = prompt("Are you sure want to delete this product ? ");
            // if (!answer) return;
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);

            if (data?.success) {
                tostS("Product deleted successfully");
                navigate('/dashboard/admin/products');
            }
            else {
                tostE(data?.message);
            }
        } catch (error) {
            console.log(error);
            tostE(error.response.data.message);
        }

    }

    return (
        <div>
            <Layout title={"Dashboard - Create Product"}>
                <div style={{ marginTop: "5rem" }} >
                    <div className="container-fluid m-3 p-3" >
                        <div className="row">
                            <div className="col-md-3">
                                <AdminMenu />
                            </div>
                            <div className="col-md-9">
                                <h1>Update product</h1>
                                <div className="m-1 w-75">
                                    <Select
                                        bordered={false}
                                        placeholder="Select a category"
                                        size='large'
                                        showSearch className='form-select mb-3'
                                        onChange={(value) => setCategory(value)}
                                        value={category}
                                    >
                                        {categories.map((c) => (
                                            <Option key={c._id} value={c._id} >
                                                {c.name}
                                            </Option>
                                        ))}
                                    </Select>
                                    <div className="mb-3 ">
                                        <label className='btn btn-outline-secondary col-md-12'>
                                            {first ? photo.name : "Upload photo"}
                                            <input type="file" name='photo' accept='image/*' onChange={(e) => { setPhoto(e.target.files[0]); setFirst(true) }} hidden />
                                        </label>
                                    </div>
                                    <div className="mb-3">
                                        {first ? (photo && (

                                            <div className="text-center">
                                                <img src={URL.createObjectURL(photo)} alt="product pic" height={'200px'} className='img img-responsive' />
                                            </div>
                                        )) : (
                                            photo && (
                                                <div className="text-center">
                                                    <img src={photo} alt="product pic" height={'200px'} className='img img-responsive' />
                                                    {/* <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${i}`} alt="product photo" height={'200px'} className='img img-responsive' /> */}
                                                </div>
                                            ))}
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" value={name} placeholder='write a name' className='form-control' onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <textarea type='textarea' value={description} placeholder='write a description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="number" value={price} placeholder='write a price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="number" value={quantity} placeholder='write a quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <Select bordered={false} placeholder="Select Shipping" size='large' value={shipping ? "yes" : "No"} showSearch className='form-select mb-3' onChange={(value) => setShipping(value)} >
                                            <Option value="0">No</Option>
                                            <Option value="1">Yes</Option>
                                        </Select>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary mx-2" onClick={handleUpdate}>UPDATE PRODUCT</button>
                                        <button className="btn btn-danger mx-2" onClick={handleDelete}>DELETE PRODUCT</button>
                                    </div>
                                    <div className="mb-3">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default UpdateProduct


















