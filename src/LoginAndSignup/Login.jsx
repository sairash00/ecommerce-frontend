import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";



const Login = () => {

    const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const showPassword = () => {
    setShow(!show);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;

    if(name === "email"){
        setFormData({
            ...formData,
            email : value
        })
    }

    if(name === "password") {
        setFormData({
            ...formData,
            password: value
        })
    }
  };

  const [msg,setMsg] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.email === ""  || formData.password  === ""){
        return setMsg("All fields are required")
    }
    if(!formData.email.includes("@")){
        return setMsg("Invalid Email Address")
    }

    if(password.length < 8){
        return setMsg("Password must be at least 8 characters long")
    }

    try {

        const response = await axios.post("https://ecommerce-backend-three-orpin.vercel.app/api/v1/users/loginUser", formData)
        const data = response.data
        setMsg(data.message)
        if(data.loggedIn){
            navigate("/")
        }
        
    } catch (error) {
        setMsg(error.response.data.message)
    }

  }

  return (
    <>
      <div className="w-[100vw]  h-[90vh] flex  justify-center items-center ">
        {/* <Link to = {"/"} className='bg-[rgb(245,245,245)] hover:text-3xl transition-all absolute top-24 left-10 rounded-full w-12 h-12 flex items-center justify-center text-2xl text-[#212121] font-[900]  '>
                ✕
            </Link> */}
        <div
          id="maindiv"
          className="min-w-[30vw] w-[30vw] h-fit rounded-md px-5 py-3 bg-[whitesmoke] text-[#212121] "
        >
          <span className="text-4xl text-[#1F2937] font-bold font-arial">
            Sign In
          </span>
          <form>
            <div className="w-full flex flex-col gap-2 mt-10 ">
              <label
                className="block text-sm font-semibold "
                htmlFor="username"
              >
                E-mail
              </label>
              <input
                className=" transition-all bg-transparent border-black border rounded-md p-2 outline-none  "
                type="email"
                name = 'email'
                value = {formData.email}
                onChange = {handleFormData}
                required
                id="email"
              />
            </div>

            <div className="w-full flex flex-col gap-2 mt-10 ">
              <label
                className="block text-sm font-semibold "
                htmlFor="password"
              >
                Password
              </label>
              <input
                className=" transition-all bg-transparent border-black border rounded-md p-2 outline-none  "
                type={show ? "text" : "password"}
                required
                onChange = {handleFormData}
                name="password"
                value = {formData.password}
                id="password"
              />
            </div>

            <div className="w-full flex gap-2 mt-2  ">
              <input
                className=" outline-none  "
                onChange={showPassword}
                type="checkbox"
                id="checkbox"
              />
              <label
                className="block text-sm font-semibold "
                htmlFor="checkbox"
              >
                Show Password
              </label>
            </div>

          

            <div>
              <button
                type="submit"
                className="font-semibold bg-[#1F2937] text-[whitesmoke] w-full mt-10 px-2 py-1 rounded-md hover:bg-[#41454b] transition-all hover:text-white "
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
           
          </form>

          <div className="flex justify-center items-center mt-5 gap-2">
            <Link
              to={"/register"}
              className="text-sm text-[#212121] transition-all font-semibold n j font-arial cursor-pointer hover:text-[#3d37b7] "
            >
              Create New Account
            </Link>
          </div>
          <div className="flex text-sm justify-center mt-3 font-semibold text-red-500">
                {msg}
            </div>
        </div>
      </div>
    </>
  );
};

export default Login;
