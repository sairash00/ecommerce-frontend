import React from "react";
import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserCard from "./UserCard.jsx";

const Users = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [Users, setUsers] = useState([])

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/getUserInfo"
      );
      const data = response.data;
      if (!data.user.admin) {
        navigate("/");
      }
    } catch (error) {
      setMsg(error.response?.data?.message);
      if(!error.response.data.loggedIn){
        return navigate("/login")
      }
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/getAllUser"
      );
      const Users = response.data.users
      setUsers(Users);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllUsers();
  }, []);

  return (
    <div
      id="maindiv"
      className="min-w-[100vw] h-[90vh] flex bg-[#1F2937] justify-center overflow-y-scroll "
    >
      <div className="w-[80vw] max-sm:w-[95vw] mt-10 min-h-[100%] ">
        <h2 className="text-2xl font-semibold leading-7 text-[whitesmoke]">
          Admin Dashboard
        </h2>
        <h2 className="text-sm mt-1 leading-6 text-gray-300">
          All required links are below
        </h2>

        <div className="mt-3 flex gap-3 flex-wrap ">
          <Link
            to={"/admin/addProduct"}
            className="border px-1 hover:bg-[whitesmoke] hover:text-[#212121] transition-all py-1  rounded"
          >
            Add Product
          </Link>
          <Link
            to={"/admin/deleteProduct"}
            className="border px-1 hover:bg-[whitesmoke] hover:text-[#212121] transition-all py-1  rounded"
          >
            Delete Product
          </Link>
          <Link
            to={"/admin/orders"}
            className="border px-1 hover:bg-[whitesmoke] hover:text-[#212121] transition-all py-1  rounded"
          >
            Orders
          </Link>
        </div>

        <h2 className="text-xl font-semibold mt-10 leading-6 text-gray-300">
          Users
        </h2>

        <div className="">
          <div className="flow-root">
            <ul role="list" className="mb-4  ">
              {Users?.map((item) => (
                <UserCard key={item._id} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
