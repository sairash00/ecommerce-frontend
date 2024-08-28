import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import React,{useState} from 'react'
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const ProductCard = ({image, name, price,id}) => {

  const[error, setError] = useState()
  const[msg,setMsg] = useState("")
  const navigate = useNavigate()


  const addToCart = async (e) => {
    try {

        const response = await axios.post("https://ecommerce-backend-three-orpin.vercel.app/api/v1/order/addToCart",{id})
        const data = response.data

        if(data.success){
          setMsg(" Added to Cart")
        }

    } catch (error) {
        setError(error.response.data)
        const loggedIn = error.response.data.loggedIn
        if(!loggedIn){
          navigate("/login")
        }
    }

  }
  

  return (
            <>
            <div id='productCard' className='group'>
              <Link  to={"/product/"+ id} className="">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    loading='lazy'
                    src= {image}
                    alt= "image"
                    className="h-full w-full object-cover object-center transition-all group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-[whitesmoke]">{name}</h3>
                <p className="mt-1 text-lg font-medium text-[whitesmoke] ">Rs {price}</p>
              </Link>
              <button onClick={addToCart} className='rounded-lg px-2 border border-[whitesmoke] mt-2 py-1 w-full hover:bg-[whitesmoke] h-10 flex items-center justify-center hover:text-[#1F2937]  transition-all '>

            {
             msg ? (
                  <IoCheckmarkDoneCircleSharp className= 'text-green-500 text-3xl' />
              ): error ? (
                <span className='font-semibold text-red-500'>{ error.message} </span>
              ) : ("Add to cart")
              }
                
               </button>
              </div>
              {/* <div className='absolute border w-10 h-10 ' >
                
              </div> */}
              </>


              
  )
}

export default ProductCard