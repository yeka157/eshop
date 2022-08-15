import React, { useEffect } from "react";
import Axios from "axios";
import { API_URL } from "./helper";
import { useDispatch, useSelector } from "react-redux/es/exports";
//CHAKRA UI
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableContainer,
  Button,
  Text,
  Input,
  Select,
  Stack,
  Image,
  Box,
  Divider,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { checkoutAction, updateCartAction } from "../actions/userAction";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const CartPage = (props) => {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, cart } = useSelector(({ userReducer }) => {
    return {
      id: userReducer.id,
      cart: userReducer.cart,
    };
  });
  let eshoplog = localStorage.getItem("eshopLog");

  const getCart = () => {
    Axios.get(API_URL + `/users/${eshoplog}`)
      .then((res) => {
        setData(res.data.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const btnDecr = (idx) => {
    let temp = [];
    Axios.get(API_URL + `/users?id=${id}`)
      .then((res) => {
        temp = [...res.data[0].cart];
        if (temp[idx].qty === 1) {
          temp[idx].qty = temp[idx].qty;
        } else if (temp[idx].qty > 1) {
          let num = temp[idx].qty;
          num -= 1;
          temp[idx].qty = num;
        }
        Axios.patch(API_URL + `/users/${id}`, {
          cart: temp,
        }).then((res) => {
          getCart();
          printCart();
          countTotal();
        });
      })
      .then((res) => {
        getCart();
        printCart();
        countTotal();
      });
  };

  const btnInc = (idx) => {
    let temp = [];
    Axios.get(API_URL + `/users?id=${id}`)
      .then((res) => {
        temp = [...res.data[0].cart];
        if (temp[idx].qty < temp[idx].stock) {
          let num = temp[idx].qty;
          num += 1;
          temp[idx].qty = num;
        }
        Axios.patch(API_URL + `/users/${id}`, {
          cart: temp,
        }).then((res) => {
          getCart();
          printCart();
          countTotal();
        });
      })
      .then((res) => {
        getCart();
        printCart();
        countTotal();
      });
  };

  const printCart = () => {
    return data.map((val, idx) => {
      return (
        <Tr>
          <Td>
            <Image src={val.images} alt={val.name} boxSize="100px" />
          </Td>
          <Td>
            <Text className="mb-3">{val.name}</Text>
            <Text fontSize="sm" color="red">
              {val.brand}
            </Text>
            <Button variant="unstyled">
              <Text
                fontSize="xx-small"
                color="red"
                onClick={() => {
                  btnRemove(idx);
                }}
              >
                Remove
              </Text>
            </Button>
          </Td>
          <Td>
            <Button className="me-1" variant="ghost" size="sm">
              <AiOutlineMinus size={15} onClick={() => btnDecr(idx)} />
            </Button>
            {val.qty}
            <Button variant="ghost" size="sm" className="ms-1">
              <AiOutlinePlus size={15} onClick={() => btnInc(idx)} />
            </Button>
          </Td>
          <Td>Rp. {val.price.toLocaleString("id")}</Td>
          <Td>Rp. {(val.price * val.qty).toLocaleString("id")}</Td>
        </Tr>
      );
    });
  };

  const countTotal = () => {
    // let jumlah = 0;
    // data.forEach((val) => {
    //   let subtotal = val.price * val.qty;
    //   jumlah += subtotal;
    //   return jumlah;
    // });
    // return setTotal(jumlah);
    // Axios.get(API_URL + `/users/${eshoplog}`)
    // .then((res) => {
    //   let temp = [...res.data.cart];
    //   if (temp.length > 1) {
    //     let count = 0;
    //     temp.forEach((val) => {
    //       count += val.price * val.qty
    //     })
    //     return setTotal(count);
    //   } else {
    //     return setTotal(1);
    //   }
    // }).catch((err)=> console.log(err))

    Axios.get(API_URL + `/users/${eshoplog}`)
      .then((res) => {
        if (res.data.cart.length > 0) {
          let num = 0;
          res.data.cart.forEach((value) => {
            num += value.price * value.qty;
          });
          setTotal(num);
        } else {
          setTotal(0);
        }
      })
      .catch((err) => console.log(err));
  };

  const btnRemove = (idx) => {
    Axios.get(API_URL + `/users?id=${eshoplog}`)
      .then((res) => {
        res.data[0].cart.splice(idx, 1);
        // setData(temp);
        Axios.patch(API_URL + `/users/${id}`, {
          cart: res.data[0].cart,
        })
          .then((response) => {
            dispatch(updateCartAction(res.data[0].cart));
            getCart();
            printCart();
            countTotal();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const btnCheckout = () => {
    //PINDAHIN DATA DAN TAMBAH DATA BARU KE DB
    Axios.post(API_URL + `/transaction`, {
      date: `${new Date().toLocaleString("en-us", {
        weekday: "long",
      })}, ${new Date().getDay()} ${new Date().toLocaleString("en-us", {
        month: "long",
      })} ${new Date().getFullYear()} - ${
        new Date().getHours() < 10 ? "0" : ""
      }${new Date().getHours()}:${new Date().getMinutes() < 10 ? "0" : ""}${new Date().getMinutes()}:${new Date().getSeconds() < 10? '0' : ''}${new Date().getSeconds()}`,
      invoiceId: `INV/${Math.floor(
        Math.random() * 1000000
      )}/${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDay()}`,
      subtotal: total,
      item: data,
      status: "Unpaid",
      userId: id,
    })
      .then((res) => {
        console.log(res.data);
        //KURANGIN STOCK
        data.forEach((val, idx) => {
          Axios.get(API_URL + `/products/${val.idProduct}`).then((res) => {
            let num = res.data.stock;
            let newStock = num - val.qty;
            getCart();
            printCart();
            countTotal();
            Axios.patch(API_URL + `/products/${val.idProduct}`, {
              stock: newStock,
            }).then((response) => {
              console.log(response.data);
              getCart();
              printCart();
              countTotal();
            });
          });
        });
        //KOSONGIN CART
        Axios.patch(API_URL + `/users/${id}`, {
          cart: [],
        })
          .then((response) => {
            dispatch(updateCartAction(response.data.cart));
            getCart();
            printCart();
            countTotal();
            navigate('/transaction')
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    //checkout stocknya kurang --> DONE
    //keluarin tanggal --> DONE
    //bikin random number Invoice --> DONE
    //transaction id, userid, date, invoice, product detail, total payment --> DONE
  };

  useEffect(() => {
    getCart();
    printCart();
    countTotal();
  }, []);

  return (
    <div className="mb-3" style={{ padding: "100px 0" }}>
      <div className="container" style={{ minHeight: "55vh" }}>
        <div className="row">
          <div className="col-9">
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Name</Th>
                    <Th>Quantity</Th>
                    <Th>Price</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>{printCart()}</Tbody>
              </Table>
            </TableContainer>
          </div>
          <div className="col-3">
            <Stack className="border rounded px-3 py-3" spacing={5}>
              <Box className="d-flex justify-content-between">
                <Text>Items : {data.length}</Text>
                <Text>Rp. {total.toLocaleString("id")}</Text>
              </Box>
              <Text>DELIVERY</Text>
              <Select placeholder="Select delivery option">
                <option value="1">Economy - Rp. 10.000</option>
                <option value="2">Express - Rp. 20.000</option>
                <option value="3">Same day delivery - Rp. 50.000</option>
              </Select>
              <Text>PROMO CODE</Text>
              <Input placeholder="Enter promo code" size="md" />
              <Button className="w-50 mb-2" colorScheme="red">
                APPLY
              </Button>
              <Divider />
              <Button
                className="mt-4"
                colorScheme="purple"
                onClick={btnCheckout}
              >
                CHECKOUT
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
