import React from 'react'
import Layout from '../component/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"All Categories"}>
            <div style={{ "margin-top": "5rem" }} >
                <div className="container mt-5" style={{ marginTop: "100px" }}>
                    <div className="row">
                        {categories?.map((e) => (
                            <div className="col-md-4 mt-5 mb-6 gx-3 gy-3" key={e._id} >
                                <Link to={`/category/${e.slug}`} className='btn btn-primary' style={{ height: "5rem", width: "20rem" }} >
                                    {e.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Categories
