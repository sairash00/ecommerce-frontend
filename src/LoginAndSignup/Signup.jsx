import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


const Signup = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    address: ""
  });

  const handleFormData = (e) => {

    const { name, value } = e.target;

    if (name === "email") {
      setFormData({
        ...formData,
        email: value,
      });
    }
    if (name === "username") {
      setFormData({
        ...formData,
        username: value,
      });
    }
    if (name === "password") {
      setFormData({
        ...formData,
        password: value,
      });
    }
    if (name === "address") {
      setFormData({
        ...formData,
        address: value,
      });
    }
  };

  const [data, setData] = useState("")
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(formData.email === '' || formData.address === '' || formData.username === '' || formData.password === "")  {
      return setData("All fields are required")
    }
    if(!formData.email.includes("@")){
        return setData("Invalid Email Address !")
    }
    if(formData.password.length < 8){
      return setData("Password must be at least 8 characters")
    }

    try {
          const response = await axios.post( "http://localhost:3000/api/v1/users/registerUser",formData)
          const data = response.data
          setData(data.message)
          console.log(data)
          if(data.loggedIn){
            navigate("/")
          }
      
    } catch (error) {
      setData(error.response.data.message)
    }

    setFormData({
        email: "",
        username: "",
        password: "",
        address: ""
      });

    
  }


  const [show, setShow] = useState(false);
  const showPassword = () => {
    setShow(!show);
  };



  return (
    <>
      <div className="w-[100vw] h-[90vh] flex relative justify-center items-center ">
         
        <div
          id="maindiv"
          className=" signupdiv w-[35vw] h-[80vh] overflow-y-scroll rounded-md px-5 py-3 bg-[whitesmoke] text-[#212121] "
        >
          <span className="text-4xl text-[#1F2937] font-bold font-arial">
            Register
          </span>
          <form >
            <div className="w-full flex flex-col gap-2 mt-10 ">
              <label className="block text-sm font-semibold " htmlFor="email">
                E-mail *
              </label>
              <input
                className=" transition-all bg-transparent border-black border rounded-md p-2 outline-none  "
                type="email"
                onChange = {handleFormData}
                value = {formData.email}
                name="email"
                required
                id="email"
              />
            </div>

            <div className="w-full flex flex-col gap-2 mt-10 ">
              <label
                className="block text-sm font-semibold "
                htmlFor="username"
              >
                Username *
              </label>
              <input
                className=" transition-all bg-transparent border-black border rounded-md p-2 outline-none  "
                type="text"
                onChange = {handleFormData}
                value = {formData.username}
                name="username"
                required
                id="username"
              />
            </div>

            <div className="w-full flex flex-col gap-2 mt-10 ">
              <label
                className="block text-sm font-semibold "
                htmlFor="password"
              >
                Password *
              </label>
              <input
                className=" transition-all bg-transparent border-black border rounded-md p-2 outline-none  "
                type={show ? "text" : "password"}
                onChange = {handleFormData}
                value = {formData.password}
                name="password"
                required
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


            <div className="w-full flex flex-col gap-2 mt-10 ">
              <label className="block text-sm font-semibold " htmlFor="address">
                Address *
              </label>
              <input
                className=" transition-all bg-transparent border-black border rounded-md p-2 outline-none  "
                type="text"
                onChange = {handleFormData}
                value = {formData.address}
                name="address"
                required
                id="address"
              />
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit} 
                className="font-semibold bg-[#1F2937] text-[whitesmoke] w-full mt-10 px-2 py-1 rounded-md hover:bg-[#41454b] transition-all hover:text-white "
              >
                {" "}
                Register{" "}
              </button>
            </div>
          </form>

          <div className="flex justify-center items-center mt-5 gap-2">
            <Link
              to={"/login"}
              className="text-sm text-[#212121] transition-all font-semibold n j font-arial cursor-pointer hover:text-[#3d37b7] "
            >
              or, Login
            </Link>
          </div>
            <div className="mt-5 w-full flex justify-center text-sm font-semibold" >{data}</div>
        </div>
      </div>
    </>
  );
};

export default Signup;
