import React,{useState} from 'react'
import axios from 'axios'
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";


const ProductCard = ({item}) => {
  const [msg, setMsg] = useState("")
  const [show, setShow] = useState(false)

  const handleDeleteProduct = async (e) => {
    try {

      const response = await axios.post("https://ecommerce-backend-three-orpin.vercel.app/api/v1/deleteProduct",{id:item._id})
      const data = response.data;
      setMsg(data.message);
      if(data.success){
        setShow(true);
      }
      
    } catch (error) {
      setMsg(error.response.data.message)
    }
  }

  return (
    <li className="flex mb-5 py-2 w-[50%] border border-gray-500 rounded px-3 max-md:w-full  max-sm:px-2 h-full shadow-[#8d8d8d] shadow-sm ">
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md ">
      <img
        src={item?.images[0]}
        alt="image"
        className="h-full w-full object-cover object-center"
      />
    </div>

    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-[whitesmoke] ">
          <h3>
              {item.name}
          </h3>
          <p className="ml-4 text-md ">Rs. {item.price}</p>
        </div>
        <p className="mt-1 text-sm text-[whitesmoke] ">{item.category} </p>
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">
      { show ? <IoCheckmarkDoneCircleSharp className= 'text-red-500 text-2xl' /> : <div></div>}

        <div className="flex">
          <button
            onClick={handleDeleteProduct}
            disabled = {show}
            type="button"
            className="font-medium transition-all text-red-400 hover:text-red-500"
          >
           {show ? "Deleted" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  </li>
);
  
}

export default ProductCard