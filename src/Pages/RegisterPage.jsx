import React from "react";
import Axios from 'axios';
import { API_URL } from "./helper";
//IMAGES
import join from './images/join.png';
import background from './images/background.jpg';
//CHAKRA
import { useToast } from "@chakra-ui/react";
//ICONS
import {FcGoogle} from 'react-icons/fc';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { useNavigate } from "react-router-dom";



const RegistPage = (props) => {
    const [user, setUser] = React.useState("");
    const [email, setMail] = React.useState("");
    const [password, setPass] = React.useState("");
    const [inputPass, setInputPass] = React.useState("password");
    const navigate = useNavigate();
    const handleInput = (element) => {
        setUser(element.target.value);
    }

    const handleMail = (element) => {
        setMail(element.target.value);
    }

    const handlePass = (element) => {
        setPass(element.target.value);
    }

    const btnSignup = () => {
        Axios.post(API_URL + "/auth/register", {
            username : user,
            email,
            password
        }).then((res) => {
            if (res.data.success) {
                setUser('');
                setMail('');
                setPass('');
                navigate('/');
                toast({
                    title: "Account Created",
                    description:`Welcome to E-SHOP`,
                    status: 'success',
                    duration : 3000,
                    isClosable: true
                })
            }
        })
    }

    const customBg = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        overflow : 'hidden',
        maxWidth : '100%'
      }

    const togglePassword = () => {
        if (inputPass === "password") {
            setInputPass("text");
        } else {
            setInputPass("password");
        }
    }

    const toast = useToast();

  return (
    <div className="py-5" style={customBg}>
      <div className="container bg-white mx-auto mt-5 p-0 row shadow-lg">
        <div id="left-register" className="col-md-6 d-none d-md-block p-5">
            <div id="title">
                <h4 className="text-primary fw-bold lh-lg my-2">E-SHOP</h4>
                <h6 style={{color: `#ccc`}} className='w-75 lh-base my-2'>
                A central hub where teams can work, plan, and achieve amazing
                things together
                </h6>
                <img src={join} alt="join-img" className="w-100"/>
          </div>
        </div>
        <div id="right register" className="col-md-6 col-12 bg-light p-5 mw-100">
            <p className="text-end mb-5" style={{color: `#ccc`}}>English (USA)</p>
            <div id="big-right" className="container">
                <div className="pt-5 w-100 text-start container">
                    <h6 style={{color: `#ccc`}} className='lh-base'>START FOR FREE</h6>
                    <h3 className="fw-bold lh-base">Sign up to E-SHOP</h3>
                    <h6 style={{color: `#ccc`}} className='lh-base'>
                        Already a member? <span className="text-primary">Login</span>
                    </h6>
                </div>
                <div className="w-100">
                    <div className="my-2 container">
                        <label htmlFor="username" className="d-block text-start">
                            Username
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="username" 
                            className="form-control w-75" 
                            onChange={handleInput} 
                        />
                    </div>
                    <div className="my-2 container">
                        <label htmlFor="email" className="d-block text-start">
                            E-mail
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="name@mail.com" 
                            className="form-control w-75" 
                            onChange={handleMail} 
                        />
                    </div>
                    <div className="my-2 container">
                        <label htmlFor="password" className="d-block text-start">
                            Password
                        </label>
                        <div className="input-group border rounded w-75">
                        <input 
                            type={inputPass}
                            id="password" 
                            placeholder="6+ Characters" 
                            className="form-control border-0" 
                            onChange={handlePass} 
                        />
                        <span className="input-group-text border-0 bg-transparent" onClick={togglePassword}>{inputPass === "password"? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</span>
                        </div>
                    </div>
                    <div className="container">
                        <button className="btn btn-primary btn-lg w-75 my-1 py-2" onClick={btnSignup}>Create an account</button>
                        <button className="btn btn-outline-secondary btn-lg w-75 my-1 p-2 d-inline" onClick={()=> window.open(`${API_URL}/auth/google`, '_blank').focus()}>
                            <FcGoogle className="d-inline"/> Sign up with Google
                        </button>
                    </div>
                </div>
                <div id="footer" className="pt-5 w-100 container">
                    <p style={{color: `#ccc`}} className='w-75 text-start'>This site is protected by reCAPTCHA and the Google 
                    <span className="text-primary"> Privacy Policy</span> and 
                    <span className="text-primary"> Terms of Service</span> apply</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegistPage;
