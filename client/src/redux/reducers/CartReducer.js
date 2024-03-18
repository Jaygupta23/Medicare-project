
const reducer = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            cart: []
        }
    }
    switch (action.type) {
        case "Add Product to Cart":
            return {
                ...state,
                cart: action.payload
            }
        default:
            return {
                ...state
            }
    }

}

export default reducer;