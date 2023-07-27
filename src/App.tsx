import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Registration } from './pages/registrationPage/Registration';
import { Login } from './pages/loginPage/Login';
import { Home } from './pages/homePage/Home';
import { Cart } from './pages/cartPage/Cart';
import { Error } from './pages/errorPage/error';
import "./styles/libs/_normolize.scss";
import "./styles/common.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regist" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
