import React from 'react';
import "./styles/libs/_normolize.scss";
import "./styles/common.scss";
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/homePage/Home';
import { Cart } from './pages/cartPage/Cart';
import { Error } from './pages/errorPage/error';
import { Regist } from './pages/authPage/Regist';
import { Login } from './pages/authPage/Login';
import { useCustomDispatch, useCustomSelector } from './hooks/store';
import { ThirdPartyAuthorization, fetchAuthMe } from './redux/slices/authSlice';
import { Accaunt } from './pages/accountPage/Account';
import { selectAuthData } from './redux/selectos';


function App() {
  const dispatch = useCustomDispatch();
  const auth = useCustomSelector(selectAuthData);
  console.log(auth)
  
  React.useEffect(() => {
    if(!auth.data){
      dispatch(ThirdPartyAuthorization())
    }else{
      dispatch(fetchAuthMe())
    }
  }, [])
  
  console.log(auth)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/accaunt" element={<Accaunt />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
