import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from'axios'

const UserCard = ({item}) => {

    const [msg, setMsg] = useState("")

  const makeAdmin = async (e) => {
    try {
      const res = await axios.post(`https://ecommerce-backend-three-orpin.vercel.app/api/v1/users/makeAdmin `,{id :item._id})
      setMsg(res.data.message)
      if(success){
      navigate("/admin/users")
      }
    } catch (error) {
      setMsg(error?.response?.data?.message)
    }
  }
  return (
    <div className='w-full mt-2 px-4 py-4 border-b border-gray-400'>
        <div className='border-b border-gray-400 mb-2 py-2 w-fit' >
            <span className='text-sm  w-fit font-semibold text-[whitesmoke] '>User Id : {item._id}</span>    
            <div className='text-sm mt-1  w-fit font-semibold text-[whitesmoke] ' >{item.admin ? "Admin" : ""}</div>
         </div>
            <div className='text-sm text-gray-300 ' >Name : {item.username} </div>
            <div className='text-sm text-gray-300 ' >Email : {item.email} </div>
            <div className='text-sm text-gray-300 ' >Address : {item.address} </div>
            <div className='text-sm text-gray-300 ' >Joined : {new Date(item.createdAt).toLocaleDateString()} </div>
            {item.admin ? null : <button onClick={makeAdmin}  className='border rounded mt-3 px-1 hover:bg-gray-700 transition-all text-sm border-gray-400'>Make Admin</button>}
            <div className='mt-2 text-sm text-gray-400' >{msg}</div>
    </div>
  )
}

export default UserCard