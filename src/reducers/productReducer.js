const INITIAL_STATE = {
    name: '',
    description: '',
    price: null,
    images: '',
    brand: '',
    category: '',
    stock: null,
}

export const productReducer = (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case "Product_clicked":
            return {...state, ...action.payload}
        default:
            return state;
    }
}