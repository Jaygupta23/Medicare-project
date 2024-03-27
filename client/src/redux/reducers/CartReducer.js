
const reducer = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            carts: []
        }
    }
    switch (action.type) {
        case "Add Product to Cart":
            return {
                ...state,
                carts: action.payload
            }
        default:
            return {
                ...state
            }
    }

}

export default reducer;