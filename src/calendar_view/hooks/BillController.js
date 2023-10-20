import { useNavigate } from "react-router-dom";
import axios from "axios";

export const BillController = () => {
// create API request to get all bills
const getBills = async (token) => {
  try {
    const response = await axios.get("http://localhost:3001/bills", {
      headers: token,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// create API request to create a bill
const createBill = async (token, bill) => {
  try {
    const response = await axios.post("http://localhost:3001/bills", bill, {
      headers: token,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// create API request to update a bill
const updateBill = async (token, bill) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/bills/${bill.id}`,
      bill,
      {
        headers: token,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// create API request to delete a bill
const deleteBill = async (token, id) => {
  try {
    const response = await axios.delete(`http://localhost:3001/bills/${id}`, {
      headers: token,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// create API request to get a bill
const getBill = async (token, id) => {
  try {
    const response = await axios.get(`http://localhost:3001/bills/${id}`, {
      headers: token,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
};

