import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import OrderCard from "./Ordercard.jsx";
import axios from "axios";
import "./order.css";

export default function Order({ show, onClose }) {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");

  const getOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/order/getOrder"
      );
     const data = res.data
     setOrders(data.order)

    } catch (error) {
        setMsg(error.response.data.message)
    }
  };

  useEffect(() => {
    if(show){
        getOrders()
    }
  }, [show]);

  return (
    <Transition show={show}>
      <Dialog className="relative z-10" onClose={onClose}>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div id="maindiv" className="absolute inset-0 overflow-hidden">
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
                    <div
                      id="containerdiv"
                      className="flex-1 overflow-y-auto px-4 py-6  sm:px-6"
                    >
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-[whitesmoke]">
                          Orders
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-[whitesmoke] hover:text-gray-300"
                            onClick={() => onClose()}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {orders.map((order) =>
                              order.ordered.map((item) => (
                                <OrderCard
                                  key = {item._id}
                                  id={order._id}
                                  item = {item}
                                />
                              ))
                            )}
                          </ul>
                        </div>
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
  );
}
