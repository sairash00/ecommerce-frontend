import { useEffect, useState } from 'react'
import ProductCard from './ProductCard.jsx'
import './style.css'
import axios from 'axios'


  export default function Products() {
    
    const[products, setProducts] = useState([])

    useEffect(()=>{

   
          const getProducts = async () => {
            try {
          const response = await axios.get("https://ecommerce-backend-three-orpin.vercel.app/api/v1/getAllProduct")
          const products = response.data.products
          setProducts(products)

    } catch (error) {
       console.log(error.message)
    }
  }

  getProducts()


    },[])

   
    
    return (
      <div id="maindiv" className="bg-[#1F2937] h-[90vh] min-w-[100vw] overflow-y-scroll">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only text-[whitesmoke] ">Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

            {
              products?.map((product)=>(
                <ProductCard key={product._id} id = {product._id} image = {product.images[0]} price = {product.price} name = {product.name} />
              ))
            }
          
          </div>
          
        </div>
      </div>
    )
  }
  