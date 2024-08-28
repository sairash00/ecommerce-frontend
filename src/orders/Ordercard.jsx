import React,{useState} from 'react'
import axios from 'axios'
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";


const Ordercard = ({item,id}) => {
  const [msg, setMsg] = useState("")
  const [show, setShow] = useState(false)

  const handleDeleteOrder = async (e) => {
    try {

      const response = await axios.post("https://ecommerce-backend-three-orpin.vercel.app/api/v1/order/cancelOrder",{id})
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
    <li className="flex py-6">
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img
        src={item.images[0]}
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
          <p className="ml-4">{item.price}</p>
        </div>
        <p className="mt-1 text-sm text-[whitesmoke] ">{item.category} </p>
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">
      { show ? <IoCheckmarkDoneCircleSharp className= 'text-green-500 text-2xl' /> : <div></div>}

        <div className="flex">
          <button
            onClick={handleDeleteOrder}
            type="button"
            className="font-medium transition-all text-red-400 hover:text-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </li>
);
  
}

export default Ordercard