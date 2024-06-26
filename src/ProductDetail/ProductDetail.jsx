
import { useState, useEffect } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import ("./style.css")


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [msg, setMsg] = useState("")
    const [product, setproduct] = useState(null)
    const[loading,setLoading] = useState(true)
    const[error, setError] = useState("")

    const getProduct = async() => {
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/getProductDetail/${id}`)
            const data = res.data
            setproduct(data.product)
            setLoading(false)

        } catch (error) {
            console.log(error)
            setMsg(error.response.data.message)
        }
    }

    const addToCart = async (e) => {
      e.preventDefault()
      try {
  
          const response = await axios.post("http://localhost:3000/api/v1/order/addToCart",{id})
          const data = response.data
          setMsg(data)
      } catch (error) {
          setMsg(error.response.data)
          const loggedIn = error.response.data.loggedIn
          if(!loggedIn){
            navigate("/login")
          }
      }
  
    }
  
    const placeOrder = async(e) => {
      const productIds = [id]
      e.preventDefault()
      try {
          const response = await axios.post("http://localhost:3000/api/v1/order/addOrder",{product: productIds})
          const data = response.data
          if(data.success){
          setMsg(data)
          setTimeout(()=>{
              setMsg("")
          },4000)
          }
      } catch (error) {
          setMsg(error.response.data.message)
          const loggedIn = error.response.data.loggedIn
          if(!loggedIn){
            navigate("/login")
          }
      }
   }

    useEffect(() => {
        getProduct()
    },[])

    if(loading){
        return(
            <div className = "h-[90vh] w-[100vw] flex absolute items-center justify-center " >
                <h1>Loading...</h1>
            </div>
        )
    }

    if(!product){
        return(
            <div className='h-[90vh] w-[100vw] flex absolute items-center justify-center ' >
                <h1>{msg}</h1>
            </div>
        )
    }

  return (
    <div  id="maindiv"  className=" h-[90vh] overflow-y-auto overflow-x-hidden  bg-[#1F2937]">
      <div className="pt-6  min-w-[100vw] ">
        {/* <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-[whitesmoke]">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav> */}

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images?.[0] ?  product.images[0] : "/noimage.jpg"}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images?.[1] ? product.images[1] : "/noimage.jpg" }
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images?.[2] ? product.images[2] : "/noimage.jpg" }
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images?.[3] ? product.images[3] : "/noimage.jpg" }
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-[whitesmoke] sm:text-3xl"> {product?.name} </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-3xl tracking-tight text-[whitesmoke]">Rs. {product?.price}</p>

            {/* Reviews */}
            {/* <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-[whitesmoke]' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0',
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div> */}

            <h1 className={ msg.success ? "text-md mt-5  font-bold tracking-tight text-green-500":  "text-md mt-5  font-bold tracking-tight text-red-500" }>{msg.message ? msg.message : null} </h1>


            <form className="mt-5">
              <button
                type="submit"
                onClick={addToCart}
                className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
              <button
              onClick={placeOrder}
                className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Order Now
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>

              <div className="space-y-6">
                <p className="text-base text-[whitesmoke]">{product?.description}</p>
              </div>
            </div>

            {/* <div className="mt-10">
              <h3 className="text-sm font-medium text-[whitesmoke]">Highlights</h3>
            </div> */}

            {/* <div className="mt-10">
              <h2 className="text-sm font-medium text-[whitesmoke]">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
