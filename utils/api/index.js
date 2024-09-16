import axios from "axios";

// import axiosInstance from '../utils/axiosServiseFactory/AxiosServiseFactory'
import axiosInstance from "../axiosServiseFactory/AxiosServiseFactory";

const getAllExpense = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const signup = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { ...data });
    return response.data;
  } catch (error) {
    return response.data
    console.error("Error:", error);
  }
};

const addNewExpense = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { ...data });

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateExpense = async (url, data) => {
  try {
    const response = await axiosInstance.patch(url, { ...data });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteExpense = async (url) => {
  try {
    const response = await axiosInstance.delete(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getExpenseById = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export {
  getAllExpense,
  getExpenseById,
  addNewExpense,
  updateExpense,
  deleteExpense,
  signup
};
