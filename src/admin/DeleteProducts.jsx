import React from "react";
import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard.jsx";

const DeleteProduct = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

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

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/getAllProduct"
      );
      const products = response.data.products;
      setProducts(products);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserInfo();
    getProducts();
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
            to={"/admin/orders"}
            className="border px-1 hover:bg-[whitesmoke] hover:text-[#212121] transition-all py-1  rounded"
          >
            Orders
          </Link>
          <Link
            to={"/admin/users"}
            className="border px-1 hover:bg-[whitesmoke] hover:text-[#212121] transition-all py-1  rounded"
          >
            Users
          </Link>
        </div>

        <h2 className="text-xl font-semibold mt-10 leading-6 text-gray-300">
          All Products
        </h2>

        <div className="mt-10">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products?.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
