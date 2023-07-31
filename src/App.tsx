import React from 'react';
import "./styles/libs/_normolize.scss";
import "./styles/common.scss";
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/homePage/Home';
import { Cart } from './pages/cartPage/Cart';
import { Error } from './pages/errorPage/error';
import { Regist } from './pages/regisPage/Regist';
import { Login } from './pages/loginPage/Login';
import { useCustomDispatch } from './hooks/store';
import { fetchAuthMe } from './redux/slices/authSlice';


function App() {

  const dispatch = useCustomDispatch();
    React.useEffect(() => {
        dispatch(fetchAuthMe())
    }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
