//ESSENTIALS
import React from "react";
import Axios from "axios";
import { Text } from "@chakra-ui/react";
import background from "./images/background.jpg";
import { API_URL } from "./helper";
import { useNavigate } from "react-router-dom";
import { loginAction, loginMiddle } from "../actions/userAction";
import { useDispatch } from "react-redux";

//REACT ICONS
import { AiOutlineEye } from 'react-icons/ai';

const LoginPage = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const customBg = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    overflow: "hidden",
    maxWidth: "100%",
    height: "100vh",
  };

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const btnLogin = async() => {
    await dispatch(loginMiddle(email,password));
    let token = localStorage.getItem('eshopLog');
    if (token) {
      Navigate('/', {replace: true});
    }

    // Axios.post(API_URL + `/auth/login`, {
    //   email,
    //   password
    // })
    // .then((res) => {
    //     console.log(res.data);
    //     localStorage.setItem('eshopLog', res.data.token);
    //     delete res.data.token;
    //     dispatch(loginAction(res.data));
    //     Navigate('/', {replace: true});
    //     //REPLACE TRUE ITU BIAR SETELAH LOGIN, DIKIRIM KE LANDING PAGE, TERUS GABISA PENCET BACK KE LOGIN PAGE LAGI
    // }).catch((error)=> {
    //     console.log(error);
    // })
  }

  return (
    <div className="py-5" style={customBg}>
      <div className="container mt-5">
        <div className="bg-white my-5 w-50 m-auto shadow-md card p-5">
          <Text fontSize="3xl" className="fw-bold">
            Login to Your Account
          </Text>
          <div>
            <span className="h6" style={{ color: "#ccc" }}>
              New Here?
            </span>
            <span className="ms-2">Sign Up</span>
          </div>
          <div>
            <label className="form-label fw-bold text-muted">Email:</label>
            <input type="email" placeholder='Email' className="form-control" onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-muted">Password:</label>
            <div className="input-group border rounded">
              <input type="password" placeholder='Password' className="form-control border-0" onChange={(e) => {setPassword(e.target.value)}}/>
              <span className="input-group-text border-0 bg-transparent"><AiOutlineEye /></span>
            </div>
          </div>
          <p className="text-muted me-2" style={{textAlign: 'right'}}>Forgot Password?<span className="text-primary ms-2" onClick={()=> Navigate('/register')}>Click here</span></p>
          <button type="button" className="btn btn-success py-2 shadow mt-3" onClick={btnLogin}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
