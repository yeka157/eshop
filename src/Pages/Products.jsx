import React from "react";
import Axios from "axios";
import { API_URL } from "./helper";
//CHAKRA
import {
  Text,
  Button,
  ButtonGroup,
  useDisclosure,
  Input,
  useToast,
  Image,
  Select,
  Textarea,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"; //TABLE
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"; //MODAL
import {
  FormControl,
  FormLabel,
} from "@chakra-ui/react"; //FORM
import {
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react"; //FORM UNTUK NUMBER
//ICONS
import { CgAdd } from "react-icons/cg";
import { FaEdit, FaSave } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

const Products = (props) => {
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [stock, setStock] = React.useState(0);
  const [images, setImages] = React.useState("");
  const [toggleDelete, setToggleDelete] = React.useState(false);
  const [toggleSave, setToggleSave] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(null);
  const [nameFilter, setNameFilter] = React.useState("");
  const [brandFilter, setBrandFilter] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  const getData = () => {
    Axios.get(API_URL + "/products/all")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getData();
    printProduct();
  }, []);

  const addProduct = () => {
    let formData = new FormData();
    formData.append('data', JSON.stringify({
      name,
      description,
      brand,
      category,
      stock,
      price
    }));
    formData.append('images', images)
    Axios.post(API_URL + "/products/add", formData).then((res) => {
      if (res.data.success) {
        toast({
          title: "Product added.",
          description: "Your product successfully added",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
      }
      getData();
      let arr = [...data];
      setData(arr);
      getData();
      onClose();
    });
  };

  const btnDelete = (id) => {
    Axios.post(API_URL + `/products/delete`, {
      id
    }).then(() => {
      getData();
      printProduct();
      setToggleDelete(!toggleDelete);
      setSelectedData(null);
      setImages("");
      toast({
        title: "Product deleted",
        description: "Selected product successfully deleted",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    });
  };

  const btnEdit = (e) => {
    let index = e.target.value; //idproducts
    Axios.post(API_URL + `/products/edit`, {
      id:index,
    }).then(() => {
      getData();
      printProduct();
    });
  };

  const btnSave = (id) => {
    Axios.patch(API_URL + `/products/${id}`, {
      name: name,
      brand: brand,
      category: category,
      price: price,
      stock: stock,
      id
    }).then(() => {
      getData();
      printProduct();
      setToggleSave(!toggleSave);
      setSelectedData(null);
      toast({
        title: "Product saved",
        description: "Edit product saved",
        status: "info",
        duration: 2500,
        isClosable: true,
      });
    });
  };

  const btnCancel = (id) => {
    // let index = e.target.value;
    // let temp = data[index];
    // let unique = temp.id;
    Axios.patch(API_URL + `/products/${id}`, {
      edit: false,
    }).then(() => {
      getData();
      // temp = [];
      printProduct();
    });
  };

  const btnFilter = () => {
    if (nameFilter) {
      if (brandFilter) {
        if (categoryFilter) {
          Axios.get(
            API_URL +
              `/products?name_like=${nameFilter}&brand=${brandFilter}&category=${categoryFilter}`
          ).then((res) => {
            setData(res.data);
          });
        } else {
          Axios.get(
            API_URL + `/products?name_like=${nameFilter}&brand=${brandFilter}`
          ).then((res) => {
            setData(res.data);
          });
        }
      } else if (categoryFilter) {
        Axios.get(
          API_URL +
            `/products?name_like=${nameFilter}&category=${categoryFilter}`
        ).then((res) => {
          setData(res.data);
        });
      } else {
        Axios.get(API_URL + `/products?name_like=${nameFilter}`).then((res) => {
          setData(res.data);
        });
      }
    } else if (brandFilter) {
      if (categoryFilter) {
        Axios.get(
          API_URL + `/products?brand=${brandFilter}&category=${categoryFilter}`
        ).then((res) => setData(res.data));
      } else {
        Axios.get(API_URL + `/products?brand=${brandFilter}`).then((res) => {
          setData(res.data);
        });
      }
    } else if (categoryFilter) {
      Axios.get(API_URL + `/products?category=${categoryFilter}`).then(
        (res) => {
          setData(res.data);
        }
      );
    }
  };

  const btnReset = () => {
    getData();
  };

  const printProduct = () => {
    let temp = "";
    return data.map((val, idx) => {
      if (val.edit) {
        temp = (
          <Tr>
            <Td>{idx + 1}</Td>
            <Td>
              <Image src={val.images} boxSize="150px" />
            </Td>
            <Td>
              <Input
                placeholder={val.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Td>
            <Td>
              <Select
                placeholder="Select Brand"
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value="IKEA">IKEA</option>
                <option value="ACE Hardware">ACE Hardware</option>
                <option value="Informa">Informa</option>
              </Select>
            </Td>
            <Td>
              <Select
                placeholder="Select Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Bedroom">Bedroom</option>
                <option value="Living Room">Living Room</option>
                <option value="Kitchen">Kitchen</option>
              </Select>
            </Td>
            <Td>
              <NumberInput>
                <NumberInputField
                  placeholder={val.stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
              </NumberInput>
            </Td>
            <Td>
              <NumberInput>
                <NumberInputField
                  placeholder={val.price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </NumberInput>
            </Td>
            <Td>
              <ButtonGroup>
                <Button
                  colorScheme="twitter"
                  value={val.idproducts}
                  onClick={() => {
                    setSelectedData(val);
                    setToggleSave(!toggleSave);
                  }}
                >
                  <FaSave />
                </Button>
                <Button
                  colorScheme="red"
                  value={val.idproducts}
                  onClick={() => {
                    btnCancel(val.id);
                  }}
                >
                  <GiCancel />
                </Button>
              </ButtonGroup>
            </Td>
          </Tr>
        );
      } else if (!val.edit) {
        temp = (
          <Tr>
            <Td>{idx + 1}</Td>
            <Td>
              <Image src={API_URL + val.images} boxSize="150px" />
            </Td>
            <Td>{val.name}</Td>
            <Td>{val.brand}</Td>
            <Td>{val.category}</Td>
            <Td>{val.stock}</Td>
            <Td>Rp. {parseInt(val.price).toLocaleString("id")}</Td>
            <Td>
              <ButtonGroup>
                <Button colorScheme="yellow" value={val.idproducts} onClick={btnEdit}>
                  <FaEdit />
                </Button>
                <Button
                  colorScheme="red"
                  value={val.idproducts}
                  onClick={() => {
                    setSelectedData(val);
                    setToggleDelete(!toggleDelete);
                  }}
                >
                  <AiFillDelete />
                </Button>
              </ButtonGroup>
            </Td>
          </Tr>
        );
      }
      return temp;
    });
  };

  return (
    <div className="mb-3" style={{ padding: "100px 0" }}>
      <div style={{ minHeight: "350px" }}>
        <div className="d-flex justify-content-between container">
          <div>
            <Text fontSize="5xl">Manage your products</Text>
            <Text fontSize="md" style={{ color: `#ccc` }} className="fw-normal">
              Prepare your products, so that customers can
              <span className="text-primary fw-bold">
                {" "}
                transact more easily.
              </span>
            </Text>
          </div>
          <div>
            <Button
              leftIcon={<CgAdd />}
              colorScheme="teal"
              variant="solid"
              size="lg"
              onClick={onOpen}
            >
              Add
            </Button>
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={() => {
                onClose();
                setImages("");
              }}
              size="xl"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add your product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <Image
                        className="shadow-sm"
                        boxSize="100% 50%"
                        margin="auto"
                        objectFit="cover"
                        src={images}
                        fallbackSrc="https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=612x612&w=0&h=jPhUdbj_7nWHUp0dsKRf4DMGaHiC16kg_FSjRRGoZEI="
                        alt="add-product"
                      />
                      <FormControl isRequired>
                        <FormLabel>Image</FormLabel>
                        <Input
                          placeholder="Product Image"
                          onChange={(e) => setImages(e.target.files[0])}
                          type="file"
                        />
                      </FormControl>
                    </div>
                    <div className="col-12 col-md-6">
                      <FormControl isRequired>
                        <FormLabel>Product Name</FormLabel>
                        <Input
                          ref={initialRef}
                          placeholder="Product Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormControl>
                      <FormControl is Required>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          placeholder="Type product description here..."
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Brand</FormLabel>
                        <Select
                          placeholder="Select Brand"
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          <option value="IKEA">IKEA</option>
                          <option value="ACE Hardware">ACE Hardware</option>
                          <option value="Informa">Informa</option>
                        </Select>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Category</FormLabel>
                        <Select
                          placeholder="Select Category"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="Bedroom">Bedroom</option>
                          <option value="Living Room">Living Room</option>
                          <option value="Kitchen">Kitchen</option>
                        </Select>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Stock</FormLabel>
                        <NumberInput>
                          <NumberInputField
                            placeholder="Product Stock"
                            onChange={(e) => setStock(e.target.value)}
                          />
                        </NumberInput>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Price (IDR)</FormLabel>
                        <NumberInput>
                          <NumberInputField
                            placeholder="Product Price"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </NumberInput>
                      </FormControl>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={addProduct}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
          {selectedData ? (
            <Modal
              isOpen={toggleDelete}
              onClose={() => {
                setToggleDelete(!toggleDelete);
              }}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Are you sure to delete{" "}
                  <span className="fw-bold main-color">
                    {selectedData.name}
                  </span>
                  ?
                </ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                  <ButtonGroup>
                    <Button
                      type="button"
                      variant="solid"
                      colorScheme="red"
                      onClick={() => {
                        setToggleDelete(!toggleDelete);
                        setSelectedData(null);
                      }}
                    >
                      No
                    </Button>
                    <Button
                      type="button"
                      variant="solid"
                      colorScheme="green"
                      onClick={() => btnDelete(selectedData.idproducts)}
                    >
                      Yes
                    </Button>
                  </ButtonGroup>
                </ModalFooter>
              </ModalContent>
            </Modal>
          ) : null}

          {selectedData ? (
            <Modal
              isOpen={toggleSave}
              onClose={() => {
                setToggleSave(!toggleSave);
              }}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Are you sure to save{" "}
                  <span className="fw-bold main-color">
                    {selectedData.name}
                  </span>
                  ?
                </ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                  <ButtonGroup>
                    <Button
                      type="button"
                      variant="solid"
                      colorScheme="red"
                      onClick={() => {
                        setToggleSave(!toggleSave);
                        setSelectedData(null);
                      }}
                    >
                      No
                    </Button>
                    <Button
                      type="button"
                      variant="solid"
                      colorScheme="green"
                      onClick={() => btnSave(selectedData.id)}
                    >
                      Yes
                    </Button>
                  </ButtonGroup>
                </ModalFooter>
              </ModalContent>
            </Modal>
          ) : null}
        </div>
        <div className="container my-3">
          <div className="row border border-2 p-2">
            <Text fontSize="xl" className="fw-bold pb-1" style={{color : '#ccc'}}>
              Filter
            </Text>
            <div className="col-12 col-md-3 my-2">
              <Input
                placeholder="Name"
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-3 my-2">
              <Select
                placeholder="Select Brand"
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="IKEA">IKEA</option>
                <option value="ACE Hardware">ACE Hardware</option>
                <option value="Informa">Informa</option>
              </Select>
            </div>
            <div className="col-12 col-md-3 my-2">
              <Select
                placeholder="Select Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="Living Room">Living Room</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Kitchen">Kitchen</option>
              </Select>
            </div>
            <div className="col-12 col-md-3 my-2">
              <div className="d-flex justify-content-evenly">
                <Button type="button" colorScheme="teal" onClick={btnFilter}>
                  Filter
                </Button>
                <Button
                  type="button"
                  colorScheme="yellow"
                  variant="outline"
                  onClick={btnReset}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>NO</Th>
                  <Th>PREVIEW</Th>
                  <Th>NAME</Th>
                  <Th>BRAND</Th>
                  <Th>CATEGORY</Th>
                  <Th>STOCK</Th>
                  <Th>PRICE</Th>
                  <Th>ACTION</Th>
                </Tr>
              </Thead>
              <Tbody>{(() => printProduct())()}</Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Products;
