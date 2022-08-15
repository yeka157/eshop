import React from 'react'
import LandingPage from './Pages/LandingPage';
import RegistPage from './Pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import Products from './Pages/Products';
import FooterComponent from './Components/Footer';
import Listings from './Pages/listings';
import LoginPage from './Pages/LoginPage';
import Axios from 'axios';
import { API_URL } from './Pages/helper';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './actions/userAction';
import ProductDetails from './Pages/ProductDetails';
import PageNotFound from './Pages/PageNotFound';
import CartPage from './Pages/CartPage';
import TransactionPage from './Pages/transactionPage';
import Verification from './Pages/Verification';
function App() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => {
    return {
      role: state.userReducer.role
    };
  });

  const keepLogin = () => {
    let eshopLog = localStorage.getItem('eshopLog');
    if (eshopLog) {
      Axios.get(API_URL + `/auth/keep`, {
        headers:{
          'Authorization' : `Bearer ${eshopLog}`
        }
      })
        .then((res) => {
          if (res.data.iduser) {
            localStorage.setItem('eshopLog', res.data.token);
            delete res.data.token
            dispatch(loginAction(res.data));
            // setRole(res.data.role);
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  React.useEffect(() => {
    keepLogin();
    // console.log(role);
  }, []);

  
  return (
    <div>
      <div style={{ position: 'absolute' }} className='w-100'>
        <NavbarComponent />
      </div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        {
          role ? null :
            <>
              <Route path='/register' element={<RegistPage />} />
              <Route path='/login' element={<LoginPage />} />
            </>
        }
        {
          role === "Admin" &&
            <>
              <Route path='/products' element={<Products />} />
            </>
        }
        <Route path='/transaction' element={<TransactionPage/>}/>
        <Route path='/listings' element={<Listings />} />
        <Route path='/productDetails' element={<ProductDetails />} />
        <Route path='/Cart' element={<CartPage/>} />
        <Route path='/verification/:token' element={<Verification/>}/>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
