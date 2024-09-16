"use client";

import { addNewExpense, deleteExpense, updateExpense } from "@/utils/api";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
// import { RiCloseLargeLine } from "react-icons/ri";
import Loading from "@/components/common/Loading";
import { toast } from "react-toastify";

const INITIAL_DATA = {
  date: "",
  amount: "",
  goods: "",
  addedBy: "",
};

const PopUp = ({ title, close, data, addOrUpdateExpense }) => {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // const handleClose = () => {
  //   setIsVisible(false);
  //   close();
  //   setTimeout(() => close(), 300); // Match the duration of the animation
  // };

  // const addOrUpdateExpense = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     if (data?._id) {
  //       await updateExpense(`/expense/update/${data?._id}`, data);
  //     } else {
  //       await addNewExpense("/expense/add", data);
  //     }
  //     setIsLoading(false);
  //     toast.success("Saved Sucessfully");
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error("Failed to save Expense!");
  //     console.error("Error while saving Expense:", error);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      addedBy: session?.user?.userId,
    };
    addOrUpdateExpense(updatedData);
    close();
    setFormData(INITIAL_DATA);
  };


  return (
    <div>
      <div className="fixed inset-0 z-40 flex items-center justify-center ">
        <div
          className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm transition-opacity "
          onClick={() => close()}
        />
        <div
          className={`relative z-20 bg-white p-5 rounded-xl transform transition-transform duration-300 ease-linear ${
            isVisible
              ? "translate-y-0 opacity-100 top-0 w-96"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex justify-between ">
            <h1 className="text-center text-gray-700 font-bold text-xl">
              {title}
            </h1>
            <div
              className="text-black text-2xl font-bold cursor-pointer"
              onClick={() => close()}
            >
              X
            </div>
          </div>
          {/* {children} */}
          {loading && <Loading />}
          <form className="">
            <div className="my-4">
              <label
                for="email"
                className="block mb-1 text-sm font-medium text-gray-900 "
              >
                Goods Name
              </label>
              <input
                type="text"
                id="name"
                value={formData?.goods}
                className="shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-secondary  block w-full p-2.5 "
                placeholder="Please Enter Goods Name"
                onChange={(e) =>
                  setFormData({ ...formData, goods: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label for="password" className="block mb-1 text-sm font-medium ">
                Amount
              </label>
              <input
                type="number"
                id="Amount"
                value={formData?.amount}
                className="shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-secondary  block w-full p-2.5"
                placeholder="Enter Amount"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label
                for="confirm_password"
                className="block mb-1 text-sm font-medium "
              >
                Date
              </label>
              <input
                type="date"
                id="Date"
                value={formData?.date}
                className="shadow-md border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-secondary  block w-full p-2.5"
                placeholder="Enter Your Date"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              className="text-white bg-secondary hover:ring-1 ring-secondary hover:bg-white hover:text-secondary transition-all ease-linear duration-300  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
