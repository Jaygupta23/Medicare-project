import { combineReducers } from "redux";
import EditProductIdReducer from './EditProductIdReducer';
import MoreDetailProductIdReducer from './MoreDetailProductIdReducer';
import CartReducer from './CartReducer';

const reducers = combineReducers({
    EditProductIdReducer,
    MoreDetailProductIdReducer,
    CartReducer,
})

export default reducers;