import React,{useState, useEffect} from 'react'
import { FaRegUser } from "react-icons/fa";
import UpdateUser from './UpdateUser.jsx'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const Profile = () => {

    const navigate = useNavigate()

    const [msg, setMsg] = useState()

    const getUserDetail = async () => {
        try {
            const response = await axios.get('https://ecommerce-backend-three-orpin.vercel.app/api/v1/users/getUserInfo')
            const data = response.data
             setMsg(data.user)
        } catch (error) {
            setMsg(error.response.data.message)
            if(!error.response.data.message.loggedIn){
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        getUserDetail()
    }, [])

  return (
    <div id='maindiv' className='  min-w-[100vw] h-[90vh] gap-20 overflow-y-scroll flex flex-col justify-between items-center  '>
            <div className='w-[50%] max-w-[50%] h-fit  gap-10 mt-5 flex items-center justify-center flex-wrap ' >
                <div className='' >
                    <FaRegUser className='text-[14rem]' />
                    </div>

                <div className='w-full  flex items-center justify-center  flex-col gap-3 ' >
                    <div className='text-2xl font-semibold  ' >{msg?.username} </div>
                    <div className='w-full flex flex-col items-center justify-center gap-1 ' >
                        <div className='text-sm font-semibold' ><span>{msg?.email} </span> </div>
                        <div className='text-sm font-semibold' > Address - <span> {msg?.address} </span> </div>
                        {/* <div className='text-sm font-semibold' > UID - <span> {msg._id} </span> </div> */}
                        <div className='text-sm font-semibold' > Joined - <span> {new Date(msg?.createdAt).toLocaleDateString()} </span> </div>

                        {msg?.admin ? <Link className='mt-4 border rounded px-2 hover:bg-[whitesmoke] hover:text-[#212121] hover:shadow-xl transition-all py-1' to= {"/admin/addProduct"}>Dashboard</Link> : null}

                    </div>
                </div>
 
                </div>
            
            <UpdateUser user = {msg} />

    </div>
)
}

export default Profile
