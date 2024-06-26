import React, {useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import axios from 'axios'
axios.defaults.withCredentials = true;

// navbar import
import Navbar from './navigationComponent/Navbar.jsx'
import Login from './LoginAndSignup/Login.jsx'
import Signup from './LoginAndSignup/Signup.jsx'
import Products from './products/Productsection.jsx'
import Cart from './cart/cart.jsx'
import Order from './orders/Orders.jsx'
import Profile from './userprofile/Profile.jsx'
import NotFound from './notfound/NotFound.jsx'
import ProductDetail from './ProductDetail/ProductDetail.jsx'
import AdminPanel from "./admin/adminPanel.jsx"
import Orders from "./admin/Orders.jsx"
import DeleteProduct from './admin/DeleteProducts.jsx'
import Users from './admin/Users.jsx'

const App = () => {

  const[open, setopen] = useState(false)
  const[show, setShow] = useState(false)
 
    function changeOpen() {
      setopen(!open)
    }
    function changeShow(){
      setShow(!show)
    }

  return (
  <div className='w-full relative h-full'>
    <BrowserRouter>
          < Navbar changeOpen = {changeOpen} changeShow = {changeShow} />
       <Routes> 
          <Route path='/' element={<Products />} />
          <Route path='/profile' element ={<Profile />} />
          <Route path = '/login' element= {<Login />} />
          <Route path = "/register" element = {<Signup />} />
          <Route path = "/product/:id" element = {<ProductDetail />} />
          <Route path = "/admin/addProduct" element = {<AdminPanel/> } />
          <Route path = "/admin/deleteProduct" element = {<DeleteProduct/> } />
          <Route path = "/admin/orders" element = {<Orders/> } />
          <Route path = "/admin/users" element = {<Users/> } />
          <Route path = "*" element = {<NotFound />} />
        </Routes>
          <Cart open = {open} onClose = {() => setopen(false)} />
          <Order show ={show} onClose = {() => setShow(false)} />
    </BrowserRouter>
    </div>
  )
}

export default App