import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { productReducer } from "./productReducer";
import { userReducer } from './userReducer';
import reduxThunk from 'redux-thunk';


export const rootStore = configureStore({
    // ⬇⬇⬇ untuk menggabungkan semua reducer yang telah dibuat ⬇⬇⬇
    reducer:{
        userReducer,
        productReducer
    }
},applyMiddleware(reduxThunk))