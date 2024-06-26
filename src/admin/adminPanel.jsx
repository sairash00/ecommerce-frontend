import React from 'react'
import AddProduct from "./AddProducts.jsx"
import './style.css'
import { useEffect, useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'

const AdminPanel = () => {
  const[msg, setMsg] = useState("")
  const navigate = useNavigate()
  const getUserInfo = async () => {
  try {

    const response = await axios.get("http://localhost:3000/api/v1/users/getUserInfo")
    const data = response.data
    console.log(data)
    if(!data.user.admin){
        navigate("/")
    }
    
  } catch (error) {
    setMsg(error.response?.data?.message)
    console.log(error)
  }}

  useEffect(()=>{
    getUserInfo()
  },[])

  return (
    <div id='maindiv' className='min-w-[100vw] h-[90vh] flex bg-[#1F2937] justify-center overflow-y-scroll '>
       <div className='w-[80vw] mt-10 min-h-[100%] '>
          <h2 className="text-2xl font-semibold leading-7 text-[whitesmoke]">Admin Dashboard</h2>
          <h2 className="text-sm mt-1 leading-6 text-gray-300">All required links are below</h2>
          
          <div className='mt-3 flex gap-3 flex-wrap ' >
            <Link to={"/admin/deleteProduct"} className='border px-1 hover:bg-[whitesmoke] hover:text-[#212121] transition-all py-1  rounded'>Delete Product</Link>
            <Link to={"/admin/orders"} className='border px-1 hover:bg-[whitesmoke] hover:text-[#212121] transition-all py-1  rounded'>Orders</Link>
            <Link to={"/admin/users"} className='border px-1 hover:bg-[whitesmoke] hover:text-[#212121] transition-all py-1  rounded'>Users</Link>
            </div>
          

            <AddProduct />

           
       </div>
    </div>
  )
}

export default AdminPanel