import React from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

//CHAKRA UI
import { Text, Button, Image } from "@chakra-ui/react";

//REACT ICONS
import {
  AiOutlineShoppingCart,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { API_URL } from "./helper";
import { updateCartAction } from "../actions/userAction";

const ProductDetails = (props) => {
  const [detail, setDetail] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const { cart, id } = useSelector(({ userReducer }) => {
    return {
      id: userReducer.id,
      cart: userReducer.cart,
    };
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state, search } = useLocation();

  const getDetail = () => {
    Axios.get(API_URL + `/products${search}`)
      .then((res) => {
        setDetail(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInc = () => {
    if (qty < state.stock) {
      setQty(qty + 1);
    }
  };

  const onDec = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const onBuy = () => {
    let temp = [...cart];
    //Memeriksa apakah product sudah ada di dalam keranjang
    let idx = temp.findIndex((val) => val.idProduct === state.id);
    if (idx >= 0) {
      temp[idx].qty += qty;
    } else {
      // Menambah data product ke dalam data keranjang sebelumnya
      temp.push({
        idProduct: state.id,
        images: state.images,
        name: state.name,
        brand: state.brand,
        category: state.category,
        price: state.price,
        qty,
      });
    }
    // Melakukan update data ke db json
    Axios.patch(API_URL + `/users/${id}`, {
      cart: temp,
    })
      .then((res) => {
        // Melakukan update data ke reducer
        dispatch(updateCartAction(res.data.cart));
        // Redirect ke cart page atau kasih toast kalo berhasil nambah product ke cart
        navigate("/Cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getDetail();
  }, []);

  return (
    <div className="mb-3" style={{ padding: "100px 0" }}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <Image
              boxSize="100% 50%"
              margin="auto"
              objectFit="cover"
              src={state.images}
              fallbackSrc="https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=612x612&w=0&h=jPhUdbj_7nWHUp0dsKRf4DMGaHiC16kg_FSjRRGoZEI="
              className="shadow"
            />
          </div>
          <div className="col-12 col-md-8">
            <Text fontSize="3xl" className="fw-bold">
              {state.name}
            </Text>
            <div className="d-flex w-75 ">
              <Text fontSize="lg" className="fs-6 my-auto me-5">
                Category : {state.category}
              </Text>
              <Text fontSize="lg" className="fs-6 my-auto">
                Brand : {state.brand}
              </Text>
            </div>
            <div className="row mt-3">
              <div className="col-8">
                <span>Description : </span>
                <Text>{state.description}</Text>
              </div>
              <div className="col-4">
                <Text>Stock left : {state.stock}</Text>
              </div>
            </div>
            <Text fontSize="3xl" className="my-auto me-5 fw-bold">
              Rp. {parseInt(state.price).toLocaleString("id")}
            </Text>
            <div className="d-flex my-2">
              <Button
                colorScheme="twitter"
                className="p-0 me-2"
                onClick={onDec}
              >
                <AiFillMinusCircle size={30} />
              </Button>
              <Text fontSize="2xl" className="me-2">
                {qty}
              </Text>
              <Button colorScheme="twitter" className="p-0" onClick={onInc}>
                <AiFillPlusCircle size={30} />
              </Button>
            </div>
            <Button
              colorScheme="telegram"
              leftIcon={<AiOutlineShoppingCart />}
              onClick={onBuy}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
