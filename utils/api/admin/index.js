import axios from "axios";

// import axiosInstance from '../utils/axiosServiseFactory/AxiosServiseFactory'
import axiosInstance from "../../axiosServiseFactory/AxiosServiseFactory";

const getDepartment = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { ...data });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getNursingStationRoomList = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { ...data });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getWardBlockList = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { ...data });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getDepartmentByHosId = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getFloorByHosId = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getBlockByHosId = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getwardHosId = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getNursingStationHosId = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getRoomCategory = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getRoomByHosId = async (url) => {
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const addRoom = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { ...data });

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getUnmappedStaffList = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { ...data });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getListMappedStationStaff = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, { ...data });

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export {
  getDepartment,
  getRoomCategory,
  addRoom,
  getDepartmentByHosId,
  getFloorByHosId,
  getNursingStationHosId,
  getwardHosId,
  getBlockByHosId,
  getRoomByHosId,
  getNursingStationRoomList,
  getWardBlockList,
  getUnmappedStaffList,
  getListMappedStationStaff
};
