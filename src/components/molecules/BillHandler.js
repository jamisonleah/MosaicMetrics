import React, { useState } from "react";
import BillForm from "./../atoms/BillForm";
const BillHandler = (props) => {
  const [bills, setBills] = useState([<BillForm handleaddBill={props.handleaddBill} key={1} />]);

  const addBill = () => {
    setBills([...bills, <BillForm handleaddBill={props.handleaddBill} key={bills.length + 1} />]);
  };

  const deleteBill = index => {
    setBills(bills.filter((_, i) => i !== index));
    props.handleremoveBill(index);
  };

  
  return (
    <div className=" bg-violet-200 p-3 mr-4 rounded-lg shadow-md w-full">
      {bills.map((bill, index) => (
        <div key={index}>
          {bill}
          <button className="bg-rose-400 border-rose-900 border-2 rounded-lg px-2 my-2" onClick={() => deleteBill(index)}>Delete</button>
        </div>
      ))}
      <button className="bg-lime-400 border-lime-900 border-2 rounded-lg mt-1 px-2"onClick={addBill}>Add Bill</button>
    </div>
  );
};

export default BillHandler;
