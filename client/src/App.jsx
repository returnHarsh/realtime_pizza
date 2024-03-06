import './App.css'
import {Routes , Route} from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import Menus from './components/ShowMenu/Menus';
import Cart from './components/Cart/Cart';
import PastOrders from './components/PastOrders/PastOrders';
import Order from './components/PastOrders/Order';
import AllOrders from './components/AdminOrderSection/AllOrders';
import OrderStatus from './components/OrderStatus/OrderStatus';

function App() {


  const {user} = useContext(UserContext);

  return (
    <>
    <Header/>
    

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element = {<Register/>} />
      <Route path='/menu' element={<Menus/>}/>
      <Route path='/cart' element={ user ? <Cart/> : <Login/> } />
      <Route path='/past/orders' element={ user ? <PastOrders/> : <Login/> }/>
      <Route path='/past/orders/:orderId' element={user ? <Order/> : <Login/>}/>
      <Route path='/admin/all/orders' element={ user ? <AllOrders/> : <Login/>}/>
      <Route path='/order/status/:orderId' element={ user ? <OrderStatus/> : <Login/>}/>

    </Routes>
    </>
  )
}

export default App
