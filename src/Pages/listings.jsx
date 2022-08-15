import React from "react";
import Axios from "axios";
import { API_URL } from "./helper";
import {
  Text,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Button,
  FormControl,
  Image,
  Box,
} from "@chakra-ui/react";
import { productClick } from "../actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Listings = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [filterData, setFilterData] = React.useState({
    name: "",
    brand: "",
    category: "",
  });
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  
  React.useEffect(() => {
    getData();
    printCard();
  }, []);

  const getData = () => {
    Axios.get(API_URL + "/products/all").then((res) => {
      setData(res.data);
    });
  };

  const btnReset = () => {
    getData();
  };

  const btnFilter = () => {
    let query = [];
    for (let prop in filterData) {
      if (filterData[prop] && filterData[prop] !== "null") {
        query.push(`${prop}=${filterData[prop]}`);
      }
    }
    if (minPrice) {
      query.push(`price_gte=${parseInt(minPrice)}`);
    }
    if (maxPrice) {
      query.push(`price_lte=${parseInt(maxPrice)}`);
    }
    Axios.get(API_URL + `/products?${query.join("&")}`).then((res) => {
      setData(res.data);
    });
  };

  const btnDetail = (id, val) => {
    Axios.get(API_URL + `/products?id=${id}`)
    .then((res) => {
      // dispatch(productClick(res.data[0]));
      navigate(`/productDetails?id=${id}`,{ state: val })
    }).catch((error) => {
      console.log(error);
    })
  };

  const printCard = () => {
    let temp = "";
    return data.map((val, idx) => {
      temp = (
        <div className="col-12 col-md-6 col-lg-4 my-3 mx-5 mx-md-0">
          <button type="button" onClick={()=> {btnDetail(val.id, val)}}>
            <Image
              boxSize="100% 50%"
              src={val.images}
              margin="auto"
              className="shadow-lg"
            />
            <Box className="container w-75">
              <Box
                bg="purple.400"
                className="text-center py-2 rounded"
                style={{ position: "relative", bottom: "30px" }}
              >
                <span className="fw-bold text-white d-block">
                  Rp. {parseInt(val.price).toLocaleString("id")}
                </span>
                <span className="text-white">{val.name}</span>
              </Box>
            </Box>
          </button>
        </div>
      );
      return temp;
    });
  };

  return (
    <div className="mb-3" style={{ padding: "100px 0" }}>
      <div style={{ minHeight: "530px" }} className="container px-0">
        <div>
          <Text fontSize="5xl" style={{ color: "#ccc" }} className="fw-bold">
            Our Arrival Products
          </Text>
          <Text fontSize="md" style={{ color: "#ccc" }}>
            Prepare your products, so that customers can{" "}
            <span className="text-primary fw-bold"> transact more easily.</span>
          </Text>
        </div>
        <div className="row mt-4">
          <div className="col-lg-3 col-12">
            <div className="container bg-primary shadow-md pb-4">
              <Text className="text-white fw-bold py-2" fontSize="xl">
                Filter
              </Text>
              <Input
                placeholder="Name"
                onChange={(e) =>
                  setFilterData({ ...filterData, name: e.target.value })
                }
                className="bg-white my-2"
              />
              <Select
                placeholder="Select brand"
                onChange={(e) =>
                  setFilterData({ ...filterData, brand: e.target.value })
                }
                className="bg-white my-2"
              >
                <option value="IKEA">IKEA</option>
                <option value="ACE Hardware">ACE Hardware</option>
                <option value="Informa">Informa</option>
              </Select>
              <Select
                placeholder="Select category"
                onChange={(e) =>
                  setFilterData({ ...filterData, category: e.target.value })
                }
                className="bg-white my-2"
              >
                <option value="Bedroom">Bedroom</option>
                <option value="Living Room">Living Room</option>
                <option value="Kitchen">Kitchen</option>
              </Select>
              <div className="row">
                <div className="col-6 pe-1">
                  <FormControl>
                    <NumberInput className="my-2">
                      <NumberInputField
                        placeholder="Minimum"
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="bg-white"
                      />
                    </NumberInput>
                  </FormControl>
                </div>
                <div className="col-6 ps-1">
                  <NumberInput className="my-2">
                    <NumberInputField
                      placeholder="Maximum"
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="bg-white"
                    />
                  </NumberInput>
                </div>
              </div>
              <div className="d-flex justify-content-evenly mt-4">
                <Button colorScheme="teal" onClick={btnFilter}>
                  Filter
                </Button>
                <Button colorScheme="yellow" onClick={btnReset}>
                  Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">{(() => printCard())()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
