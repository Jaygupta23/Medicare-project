import React from 'react'
import { useSearch } from '../../context/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data.results });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form role='search' className="d-flex" onSubmit={handleSubmit} >
                <input
                    type="search"
                    placeholder='Search'
                    aria-label='Search'
                    className="form-control me-2"
                    style={{ width: "18rem" }}
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                {/* <button className="btn btn-outline-success text-light d-sm-block d-none" type='submit'>Search</button> */}
            </form>
        </div>
    )
}

export default SearchInput
