"use client";
import React, { useEffect, useState } from "react";
import PopUp from "../PopUp";
import { useSession } from "next-auth/react";
import UserExpense from "../UserExpenseDetails";

const DashboardTable = ({ data, deleteExpenseById, addOrUpdateExpense }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expense, setExpense] = useState({});
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data?.expenses);
  const [selectedUser, setSelectedUser] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { data: session } = useSession();

  const handleAdd = () => {
    // Ensure the delete modal is closed before opening the PopUp modal
    setIsOpen(true);
    setDeleteOpen(false);
    setExpense({});
  };

  const handleDetail = () => {
    // Ensure the delete modal is closed before opening the PopUp modal
    setIsDetailOpen(true);
    setIsOpen(false);
    setDeleteOpen(false);
    setExpense({});
  };

  const handleEdit = (exp) => {
    // Ensure the PopUp modal is closed before opening the delete modal
    setIsOpen(true);
    setExpense(exp);
    setDeleteOpen(false);
  };

  const handleDelete = () => {
    deleteExpenseById(expense._id);
    setDeleteOpen(false);
    setExpense({});
  };

  const handleClosePopup = async () => {
    setIsOpen(false);
    setDeleteOpen(false);
    setExpense({});
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    let filtered = data?.expenses;

    if (selectedUser) {
      filtered = filtered.filter((exp) =>
        exp.addedBy.username.includes(selectedUser)
      );
    }

    if (searchInput) {
      filtered = filtered.filter(
        (exp) =>
          exp.amount.toLowerCase().includes(searchInput.toLowerCase()) ||
          exp.goods.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedUser, searchInput, data]);

  console.log("api data", data);

  return (
    <>
      {/* {loading && <Loading />} */}
      <div className="flex flex-wrap lg:justify-between items-center  mb-5 gap-5 px-5 md:px-10">
        <div className="md:w-72 w-full">
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 capitalize text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={handleUserChange}
          >
            <option value="">Select User</option>
            {data?.userExpenses?.map((user, index) => (
              <option key={index} value={user?.userName}>
                {user?.userName}
              </option>
            ))}
            {/* {Array.isArray(data) &&
              [...new Set(data.map((exp) => exp?.expenses?.addedBy.username))].map(
                (username, index) => (
                  <option key={index} value={username}>
                    {username}
                  </option>
                )
              )} */}
          </select>
        </div>

        <label for="voice-search" class="sr-only">
          Search
        </label>
        <div class="md:w-72 w-full ">
          <input
            type="search"
            id="voice-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:outline-none rounded-lg focus:ring-primary focus:border-primary block w-full  p-2.5  "
            placeholder="Search By Name,Goods, Amount"
            onChange={handleSearchInputChange}
          />
        </div>

        <button
          className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-md focus:outline-none"
          onClick={() => handleDetail()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="25"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="m8,16c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm-1.5-11.5c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm0,5c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5ZM19,0H5C2.243,0,0,2.243,0,5v13c0,2.757,2.243,5,5,5h3c.552,0,1-.447,1-1s-.448-1-1-1h-3c-1.654,0-3-1.346-3-3V5c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v9c0,.553.448,1,1,1s1-.447,1-1V5c0-2.757-2.243-5-5-5Zm-8,7h7c.552,0,1-.448,1-1s-.448-1-1-1h-7c-.552,0-1,.448-1,1s.448,1,1,1Zm0,5h7c.552,0,1-.448,1-1s-.448-1-1-1h-7c-.552,0-1,.448-1,1s.448,1,1,1Zm12.705,6.549c.391.578.391,1.324,0,1.902-.896,1.325-2.959,3.549-6.705,3.549s-5.809-2.224-6.706-3.549c-.391-.579-.391-1.325,0-1.902.896-1.325,2.958-3.549,6.705-3.549s5.809,2.224,6.705,3.549Zm-1.775.951c-.73-1.006-2.263-2.5-4.93-2.5s-4.201,1.495-4.93,2.5c.729,1.006,2.263,2.5,4.93,2.5s4.2-1.494,4.93-2.5Zm-4.93-1.5c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Z" />
          </svg>
          <span className="w-full">Details</span>
        </button>
        <button
          className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-md focus:outline-none"
          onClick={() => handleAdd()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="17"
            height="17"
            fill="white"
          >
            <g>
              <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
            </g>
          </svg>
          <span className="w-full">Add More </span>
        </button>
      </div>
      <div className="px-5 md:px-10 md:pb-10 ">
        <div className="z-0 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center rtl:text-right text-secondary">
            <thead className="text-sm text-secondary uppercase bg-green-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Goods
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((exp, index) => (
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
                    {exp?.addedBy?.username}
                  </th>
                  <td className="px-6 py-4">{exp.goods}</td>
                  <td className="px-6 py-4">{exp.amount}</td>
                  <td className="px-6 py-4">{exp.date} </td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isOpen && (
          <PopUp
            data={expense}
            title={expense?._id ? "Update Expense" : "Add Expense"}
            addOrUpdateExpense={addOrUpdateExpense}
            close={() => handleClosePopup()}
          />
        )}
        {deleteOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center ">
            <div
              className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm transition-opacity "
              // onClick={handleClose}
            />
            <div
              className={`relative z-20 bg-white p-5 rounded-xl transform transition-transform duration-300 ease-linear ${
                deleteOpen
                  ? "translate-y-0 opacity-100 top-0 w-96"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* <div className="flex justify-between ">
                <h1 className="text-center text-gray-700 font-bold text-xl">
                  {expense?.goods}
                </h1>
              </div> */}
              {/* <div class="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5"> */}
              <button
                onClick={() => handleClosePopup()}
                class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="deleteModal"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <svg
                class="text-gray-400  w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p class="mb-4 text-gray-500 ">
                Are you sure you want to delete this item?
              </p>
              <div class="flex justify-center items-center space-x-4">
                <button
                  onClick={() => handleClosePopup()}
                  class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 "
                >
                  No, cancel
                </button>
                <button
                  onClick={() => handleDelete()}
                  class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none "
                >
                  Yes, I&apos;m sure
                </button>
              </div>
              {/* </div> */}

              {/* <button
                
                className="text-white bg-secondary hover:ring-1 ring-secondary hover:bg-white hover:text-secondary transition-all ease-linear duration-300  focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Submit
              </button> */}
            </div>
          </div>
        )}
        {isDetailOpen && (
          <UserExpense
            data={data?.userExpenses}
            // title={expense?._id ? "Update Expense":"Add Expense"}
            // addOrUpdateExpense={addOrUpdateExpense}
            close={() => setIsDetailOpen(false)}
          />
        )}
      </div>
      {/* <div class="flex justify-center items-center gap-4 pb-10">
        <button
          disabled
          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
          Previous
        </button>
        <div class="flex items-center gap-2">
          <button
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              1
            </span>
          </button>
          <button
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              2
            </span>
          </button>
          <button
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              3
            </span>
          </button>
          <button
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              4
            </span>
          </button>
          <button
            class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              5
            </span>
          </button>
        </div>
        <button
          class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </button>
      </div> */}
    </>
  );
};

export default DashboardTable;
