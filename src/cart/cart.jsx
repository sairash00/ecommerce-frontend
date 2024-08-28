    import { useEffect, useState } from 'react'
    import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
    import { XMarkIcon } from '@heroicons/react/24/outline'
    import CartCard from './cartCard.jsx'
    import './cart.css'
    import axios from 'axios'
    import {useNavigate} from 'react-router-dom'

    

    export default function Cart({open, onClose}) {
        const navigate = useNavigate()
        const [msg,setMsg] = useState("")
        const[cart,setCart] = useState([])
        const[productIds, setProductIds] = useState([])
        const[order, setOrder] = useState("")

        // const[run,setRun] = useState(false)

        const getCartItem = async() => {
            try {
                const response = await axios.get("https://ecommerce-backend-three-orpin.vercel.app/api/v1/order/getCartDetails")
                const data = response.data
                setCart(data.user.cart)
                setMsg(data.message)
                
            } catch (error) {
                return setMsg(error.response.data.message)
            }
         }

         const placeOrder = async() => {
            try {
                const response = await axios.post("https://ecommerce-backend-three-orpin.vercel.app/api/v1/order/addOrder",{product:productIds})
                const data = response.data
                if(data.success){
                setOrder(data.message)
                setTimeout(()=>{
                    setOrder("")
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


        useEffect(() =>{
            if(open){
                    getCartItem()
                }
                },[open])

        useEffect(() => {

           const ids =  cart.map( item => item._id)
           setProductIds(ids)
        
        }, [cart])
        


            // const handleRemoveItem = (key) => {
            //     setCart(cart.filter(item => item))
            // }



        let i = 0

    return (
        <Transition show={open}>
        <Dialog className="relative z-10" onClose={onClose}>
            <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-[#80808085] bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div  className="fixed inset-0 overflow-hidden">
            <div id='maindiv'  className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-hidden bg-[#1F2937] shadow-xl">
                        <div id='containerdiv' className="flex-1 overflow-y-auto px-4 py-6  sm:px-6">
                        <div className="flex items-start justify-between">
                            <DialogTitle className="text-lg font-medium text-[whitesmoke]">Shopping cart</DialogTitle>
                            <div className="ml-3 flex h-7 items-center">
                            <button
                                type="button"
                                className="relative -m-2 p-2 text-[whitesmoke] hover:text-gray-300"
                                onClick={() =>onClose() }
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">

                                {
                                    cart.map((item)=>(
                                        <CartCard key={i++} item={item}/>
                                    ))
                                }

                            </ul>
                            </div>
                        </div>
                        </div>

                        <div className="border-t border-gray-700 px-4 py-6 sm:px-6">
                            <div className='flex justify-center text-green-500'>{ order ? order : "" }</div>
                        <div className="mt-6">
                            <a
                            // onClick={() => setRun(true)}
                            onClick={placeOrder}
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                            Order Now
                            </a>
                        </div>
                        
                        </div>
                    </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
            </div>
        </Dialog>
        </Transition>
    )
    }
