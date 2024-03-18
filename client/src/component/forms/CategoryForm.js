import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue, update }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={`mb-3 ${update === true ? 'mt-5' : ''} `}>
                    <input type="text" className='form-control mt-1' placeholder="Enter new category" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>

                <button type='submit' className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CategoryForm












// onChange={(e) => setValue(e.target.name)}