"use client";

import { addNewExpense, deleteExpense, updateExpense } from "@/utils/api";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
// import { RiCloseLargeLine } from "react-icons/ri";
import Loading from "@/components/common/Loading";
import { toast } from "react-toastify";

const UserExpense = ({ title, close, data }) => {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  console.log(data);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
          <div className="z-0 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center rtl:text-right text-secondary">
              <thead className="text-sm text-secondary uppercase bg-green-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                 Dues
                </th>
                  {/* <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th> */}
                </tr>
              </thead>
              <tbody>
                {data?.map((exp, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-secondary whitespace-nowrap capitalize"
                    >
                      {exp?.userName}
                    </th>
                    <td className="px-6 py-4">{exp.yourAmount}</td>
                    <td className="px-6 py-4">{exp.yourDues.toFixed(2)}</td>
                    {/* <td className="px-6 py-4">{exp.date} </td>
                    <td className="px-6 py-4 flex justify-center gap-5">
                      <button
                        onClick={() => handleEdit(exp)}
                        disabled={exp?.addedBy?._id !== session?.user?.userId}
                        className="disabled:opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          id="Outline"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="green"
                        >
                          <path d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z" />
                          <path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setDeleteOpen(true), setExpense(exp);
                        }}
                        disabled={exp?.addedBy?._id !== session?.user?.userId}
                        className="disabled:opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          id="Outline"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="red"
                        >
                          <path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z" />
                          <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z" />
                          <path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                        </svg>
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserExpense;
