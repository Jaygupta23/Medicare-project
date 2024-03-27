import React, { useState, useEffect } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import { tostE, tostS } from '../../toast/Toast'
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    const navigate = useNavigate();


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

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            console.log(photo);
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
            if (data?.success) {
                tostS("Product created Successfully");
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
        <Layout title={"Dashboard - Create Product"}>
            <div style={{ marginTop: "7rem" }} >
                <div className="container-fluid" >
                    <div className="row">
                        <div className="col-md-3 px-5 ">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9 px-5">
                            <h1>Create product</h1>
                            <div className="m-1 w-75">
                                <Select
                                    bordered={false}
                                    placeholder="Select a category"
                                    size='large'
                                    showSearch className='form-select mb-3'
                                    onChange={(value) => setCategory(value)}
                                >
                                    {categories.map((c) => (
                                        <Option key={c._id} value={c._id} >
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                                <div className="mb-3 ">
                                    <label className='btn btn-outline-success col-md-12'>
                                        {photo ? photo.name : "Upload Photo"}
                                        <input type="file" name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    {photo && (
                                        <div className="text-center">
                                            <img src={URL.createObjectURL(photo)} alt="product-pic" height={'200px'} className='img img-responsive' />
                                        </div>
                                    )}
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
                                    <Select bordered={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => setShipping(value)} >
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-success" onClick={handleCreate}>CREATE PRODUCT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
