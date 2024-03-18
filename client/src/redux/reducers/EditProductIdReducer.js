
const reducer = (state, action) => {
    if (typeof state === 'undefined') {
        return {
            epId: null
        }
    }

    switch (action.type) {
        case "Edit Product setId":
            return {

                epId: action.payload
            }
        default:
            return {
                state
            }
    }

}

export default reducer;