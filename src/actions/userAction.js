import axios from "axios"
import { API_URL } from "../Pages/helper"

export const loginAction = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const loginMiddle = (email,password) => {
    return async(dispatch)=> {
        try {
            let res = await axios.post(API_URL+'/auth/login', {
                email,password
            });
            localStorage.setItem('eshopLog', res.data.token);
            delete res.data.token;
            dispatch({
                type:"LOGIN_SUCCESS",
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT_SUCCESS"
    }
}

export const productClick = (data) => {
    return {
        type: "Product_clicked",
        payload: data
    }
}

export const updateCartAction = (data) => {
    return {
        type: "UPDATE_CART",
        payload: data
    }
}

export const checkoutAction = (data) => {
    return {
        type: "Checkout",
        payload: data
    }
}