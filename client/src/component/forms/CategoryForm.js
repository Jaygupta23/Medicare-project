import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue, update }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <div className="row-sm ">
          <div className={` ${update === true ? "mt-5" : ""} col-9 `}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter new category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div className="col-3 mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;

// onChange={(e) => setValue(e.target.name)}
