import React from 'react'
import OrderedCard from './orderedCard'

const OrderCard = ({item}) => {

  return (
    <div className='w-full mt-8 px-4 py-1 rounded  border border-gray-500 shadow-md shadow-[#6a6a6a]'>
        <div className='text-sm border-b border-gray-400 py-2 w-fit font-semibold text-[whitesmoke] ' >Order Id : {item._id}</div>
        <div className='mt-2 py-2 border-b border-gray-400 w-fit' >
            <div className='text-md  mb-1 text-[whitesmoke] font-semibold ' >Ordered By -</div>
            <div className='text-sm text-gray-300 ' >Name : {item.orderedBy.username} </div>
            <div className='text-sm text-gray-300 ' >Email : {item.orderedBy.email} </div>
            <div className='text-sm text-gray-300 ' >Address : {item.orderedBy.address} </div>
            <div className='text-sm text-gray-300 ' >Joined : {new Date(item.orderedBy.createdAt).toLocaleDateString()} </div>
            <div className='text-sm text-gray-300 ' >User Id : {item.orderedBy._id}</div>
        </div>
        <div className='mt-2'>
        <div className='text-md  mb-1 text-[whitesmoke] font-semibold ' >Ordered -</div>
            {
                item.ordered.map((product) => (
                    <OrderedCard key={item._id} id = {item._id} item = {product} />
                ))
            }
        </div>
    </div>
  )
}

export default OrderCard