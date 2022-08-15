import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/hooks/useDispatch";

//CHAKRA UI
import { Text, Avatar, AvatarBadge } from "@chakra-ui/react";
import { Spinner, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Button, Badge } from "@chakra-ui/react";
import { logoutAction } from "../actions/userAction";


const NavbarComponent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(true);

  const { username, status, role, cart } = useSelector((state) => {
    return {
      username: state.userReducer.username,
      status: state.userReducer.status,
      role: state.userReducer.role,
      cart: state.userReducer.cart
    };
  });

  const btnSignout = () => {
    console.log("button clicked");
    localStorage.clear();
    dispatch(logoutAction());
    navigate('/login', {replace: true});
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (visible) {
        setVisible(false);
      }
    }, 2000);
  }, []);

  return (
    <div
      className="navbar navbar-expand-lg navbar-light bg-transparent"
      style={{ height: "50px" }}
    >
      <div className="container">
        <span className="navbar-brand" onClick={() => navigate("/")}>
          <span className="fw-bold">E-SHOP</span>
          <span className="lead ms-1">| Furniture</span>
        </span>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#eshopnavbar"
          // aria-controls='eshopnavbar'
          // aria-expanded='false'
          // aria-label='Toggle navigation'
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="eshopnavbar">
          <ul className="navbar-nav me-auto mb-2">
            <li>
              <span
                className="nav-link active mt-2"
                onClick={() => navigate("/listings")}
              >
                Product
              </span>
            </li>
          </ul>
          <div className="d-flex">
            {visible ? (
              <Spinner
                className="position-relative"
                style={{ top: "5px", right: '50px'}}
              />
            ) : 
            username ? (
              <div className="d-flex">
                <Text as="i" fontSize="l" className="me-3 my-auto">
                  {status}
                </Text>
                <Menu>
                  <MenuButton as={Button} className="bg-transparent">
                    <Avatar name={username} size="sm">
                      <AvatarBadge boxSize="1em" bg="green.500" />
                    </Avatar>
                  </MenuButton>
                    {role === "user"? 
                    <MenuList>
                      <MenuItem>Profile</MenuItem>
                      <MenuItem onClick={()=> navigate('/Cart')}>Cart <Badge colorScheme='green' className="ms-1">{cart.length}</Badge></MenuItem>
                      <MenuItem onClick={()=> navigate('/transaction')}>Transaction Details</MenuItem>
                      <MenuDivider/>
                      <MenuItem className="text-danger" onClick={btnSignout}>Signout</MenuItem>
                    </MenuList>
                    :
                    <MenuList>
                      <MenuItem onClick={()=> navigate('/products')}>Product Management</MenuItem>
                      <MenuItem>Transaction Management</MenuItem>
                      <MenuDivider/>
                      <MenuItem className="text-danger" onClick={btnSignout}>Signout</MenuItem>
                    </MenuList>
                      }
                </Menu>
              </div>
            ) : (
              <div className="btn-group">
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
