import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
  } from '@headlessui/react'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
  import { FaRegUserCircle } from "react-icons/fa";
  import { IoCartOutline } from "react-icons/io5";
  import {Link,useNavigate} from 'react-router-dom'
  import './navbar.css'
import { useState } from 'react';
import axios from 'axios'
  
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function Navbar({changeOpen, changeShow}) {
    const navigate = useNavigate()
    const[msg, setMsg] = useState("")
    const Logout = async () => {
      try {
        const response = await axios.post("https://ecommerce-backend-three-orpin.vercel.app/api/v1/users/logoutUser")
        const data = response.data

        if(data.success){
          navigate("/login")
        }
        
      } catch (error) {
        setMsg(error.response.data.message)
      }
    }

    return (
      <Disclosure as="nav" className="h-[10vh] bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-10 "
                      src="/pngegg.png"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">

                        <Link
                          to="/"
                          className=  'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ' >
                         Products
                        </Link>

                        <div
                          className=  'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ' 
                          onClick={changeShow}
                          >
                         My Orders
                        </div>

                        

                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  
                    <IoCartOutline onClick={changeOpen} id='iconcart' className='text-2xl '  />
                  
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm  focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <FaRegUserCircle className=' text-3xl ' />
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      
                      
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to="/profile"
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </Link>
                          )}
                        </MenuItem>
                        
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={Logout}
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 text-start py-2 text-sm w-full text-gray-700')}
                            >
                              Sign out
                            </button>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
  
            <DisclosurePanel className="sm:hidden">
              <div className=" absolute bg-[#1F2937] w-full min-h-[20vh] z-10 space-y-1 px-2 pb-3 pt-2">

                  <DisclosureButton>
                
                    <div className="flex space-x-4">
                        <Link
                        to={"/"}
                        className=  'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ' >
                        Products
                      </Link>
                      </div>
                    <div className="flex space-x-4">
                        <div
                        onClick={changeShow}
                        className=  'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ' >
                        My Orders
                      </div>
                      </div>
                    
                  </DisclosureButton>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    )
  }
  