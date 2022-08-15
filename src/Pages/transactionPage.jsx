import React, { useEffect } from "react";
import Axios from "axios";
import { API_URL } from "./helper";
import { useSelector } from "react-redux/es/exports";

//CHAKRA UI
import {
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Badge,
  Image, Divider
} from "@chakra-ui/react";

const TransactionPage = (props) => {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const { id } = useSelector(({ userReducer }) => {
    return {
      id: userReducer.id,
    };
  });
  let eshoplog = localStorage.getItem("eshopLog");

  const getInvoice = () => {
    Axios.get(API_URL + `/transaction`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const printInvoice = () => {
    return data.map((val, idx) => {
      if (val.userId === id) {
        return (
          <div>
            <div className="card shadow">
              <div className="w-100 bg-primary">
                <Text>{val.date}</Text>
                {val.status === "Unpaid" ? (
                  <Badge className="">{val.status}</Badge>
                ) : (
                  <Badge className="">{val.status}</Badge>
                )}
                <Text>{val.invoiceId}</Text>
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <Image src={val.item[0].images} />
                    <div>
                      <Text>{val.item[0].name}</Text>
                      <Text>{val.item[0].qty} x {val.item[0].price.toLocaleString("id")}</Text>
                      {val.item.length > 1 ? <Text>+ {val.item.length-1} Produk lainnya</Text> : <></>}
                    </div>
                  </div>
                  <div>
                    <Divider orientation="vertical"/>
                    <Text>Total Belanja</Text>
                    <Text className="fw-bold">Rp. {val.subtotal.toLocaleString("id")}</Text>
                  </div>
                </div>
                <div>
                  <Button colorScheme='red'>Batalkan Pesanan</Button>
                  <Button colorScheme='blue'>Lihat Detail Produk</Button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  const countTotal = () => {
    Axios.get(API_URL + `/transaction?userId=${eshoplog}`)
      .then((res) => {
        let num = 0;
        res.data.forEach((value) => {
          num += value.subtotal;
        });
        setTotal(num);
        return total;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInvoice();
    printInvoice();
    countTotal();
  }, []);

  return (
    <div className="mb-3" style={{ padding: "100px 0" }}>
      <div className="container p-0" style={{ minHeight: "55vh" }}>
        <div>
          <Text align="center" className="fw-bold" fontSize="2xl">
            INVOICE
          </Text>
          {printInvoice()}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
