import React from "react";
import Axios from 'axios';
import { Button, Text } from '@chakra-ui/react';
import { API_URL } from "./helper";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { loginAction } from "../actions/userAction";

export default function Verification() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const btnVerify = async() => {
            // let token = localStorage.getItem('eshopLog');
            console.log(params.token);
            if (params.token) {
                Axios.get(API_URL + `/auth/verify`, {
                    headers:{
                      'Authorization' : `Bearer ${params.token}`
                    }
                  })
                .then((res) => {
                    if (res.data.iduser) {
                        console.log(res.data);
                        localStorage.setItem('eshopLog', res.data.token);
                        delete res.data.token;
                        dispatch(loginAction(res.data));
                        navigate('/', {replace : true});
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                console.log("gagal");
            }
    }
  return (
    <div className="container" style={{ minHeight: "77vh", height: "77vh" }}>
      <Text textAlign="center" fontSize="6xl" style={{ paddingTop: "65px" }} className=''>
        Verify Your Account
      </Text>
      <Text fontSize='lg' textAlign='center' className="my-4">Verify your account to continue using our site</Text>
      <div className="w-25 container p-0 my-5">
      <Button variant='solid' colorScheme='teal' size='lg' onClick={btnVerify}>Click Here to Verify Your Account</Button>
      </div>
    </div>
  );
}
