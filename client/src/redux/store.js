import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import thunk from 'redux-thunk';

const presistance = localStorage.getItem('reduxStore') ? JSON.parse(localStorage.getItem('reduxStore')) : {}

const enhancer = applyMiddleware(thunk);


export const store = createStore(reducers, presistance, applyMiddleware(thunk));