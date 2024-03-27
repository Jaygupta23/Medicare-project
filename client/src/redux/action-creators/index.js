export const mdId = (id) => {
    return (dispatch) => {
        dispatch({
            type: "More Detail setId",
            payload: id
        })
    }
}

export const epId = (id) => {
    return (dispatch) => {
        dispatch({
            type: "Edit Product setId",
            payload: id
        })
    }
}

export const carts = (count) => {
    return (dispatch) => {
        dispatch({
            type: "Add Product to Cart",
            payload: count
        })
    }
}