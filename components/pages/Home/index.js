"use client";

import React, { useEffect, useState } from "react";
import DashboardGrid from "../../section/DashboardGrid";
import DashboardTable from "../../section/DashboardTable";
import { useSession } from "next-auth/react";
import {
  addNewExpense,
  deleteExpense,
  getAllExpense,
  updateExpense,
} from "@/utils/api";
import Loading from "@/components/common/Loading";
import { toast } from "react-toastify";
import PopUp from "@/components/section/PopUp";
import CanvasAnimation from "@/components/section/CanvasAnimation";
import RobotAnimation from "@/components/section/RobotAnimation";

const Home = () => {
  const { data: session } = useSession();
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.token) {
      getExpenseLists();
    }
  }, [!!session]);

  const getExpenseLists = async () => {
    // setIsLoading(true);

    try {
      const res = await getAllExpense("expense");
      setExpenseList(res ? res : []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Building List Of Hospital :", error);
      setIsLoading(false);
      throw error;
    }
  };

  const addOrUpdateExpense = async (data) => {
    setIsLoading(true);
    try {
      if (data?._id) {
        await updateExpense(`/expense/update/${data?._id}`, data);
      } else {
        await addNewExpense("/expense/add", data);
      }
      getExpenseLists();
      setIsLoading(false);
      toast.success("Saved Sucessfully");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to save Expense!");
      console.error("Error while saving Expense:", error);
    }
  };

  const deleteExpenseById = async (id) => {
    setIsLoading(true);
    try {
      await deleteExpense(`/expense/delete/${id}`);
      setIsLoading(false);
      getExpenseLists();
      toast.error("Deleted SuccessFully");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to Delete Expense!");
      console.error("Error while Deleting Expense:", error);
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {/* <RobotAnimation /> */}
      <DashboardGrid data={expenseList} />
      <DashboardTable
        data={expenseList}
        addOrUpdateExpense={addOrUpdateExpense}
        deleteExpenseById={deleteExpenseById}
      />
    </div>
    // <div className="relative bg-black  w-full h-screen overflow-hidden">
    //   <RobotAnimation />
    //   <div className="relative z-10 p-10">
    //     <h1 className="text-4xl font-bold text-center">
    //       Welcome to the Blasting Rainy Page!
    //     </h1>
    //     <p className="text-lg text-center mt-4">
    //       Scroll down to see the rain blast in action.
    //     </p>

    //   </div>
    // </div>
  );
};

export default Home;
