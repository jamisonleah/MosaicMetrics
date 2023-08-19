//import react and useState
import React, { useState } from 'react';
//import the bill form component
import BillForm from '../atoms/BillForm';
//import checkbox checked and unchecked icons
import IncomeHandler from '../atoms/IncomeHandler';

//create a form panel component

// Dependencies 
// 1. BillForm
// 2. IncomeHandler

// props 
// 1. handleBill
// 2. handleIncome
// 3. incomeState


const FormPanel = ({ handleBill, handleIncome, incomeState }) => {


    const [incomeExpenseToggle, setIncomeExpenseToggle] = useState(true);
    


    return (
        <div className="flex flex-col justify-start items-center h-full w-full bg-violet-200 border-l-2 border-violet-300 py-5 border-b-2 ">
             <button className={`flex flex-row justify-end w-4/6 font-semibold text-xs hover:text-sky-900`}
                onClick={() => setIncomeExpenseToggle(!incomeExpenseToggle)}> {incomeExpenseToggle ? "Change Income" : "Add Expense"} </button>
            {incomeExpenseToggle ? <BillForm handleBill={handleBill} /> : <IncomeHandler handleIncome={handleIncome} incomeState={incomeState} />}
           
        </div>

    );
}
export default FormPanel;