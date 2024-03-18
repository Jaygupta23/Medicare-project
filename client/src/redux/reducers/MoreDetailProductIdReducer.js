const reducer = (state, action) => {
    if (typeof state == 'undefined') {
        return {

        }
    }
    switch (action.type) {
        case "More Detail setId":
            return {
                mdId: action.payload
            }
        default:
            return {
                state
            }
    }
}

export default reducer;