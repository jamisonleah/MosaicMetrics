//import react and useState
import React, { useState } from 'react';
//import the bill form component
import ExpenseFilter from '../atoms/ExpenseFilter';


/*
    props: 
        filterBills: function to filter bills
        initialIncomeInputBox: function to render the initial income input box
        combinedBillList: array of bill form components
*/
const BillList = (props) => {
    return (
        <div className="flex flex-col justify-start items-center h-5/6 w-full bg-violet-200 py-2">
        <div className="flex flex-row font-bold justify-start items-center w-full bg-violet-200 py-3 px-5 border-violet-300 border-b-2 ">
            <ExpenseFilter filterBills={props.filterBills} />
        </div>
            <div className="flex flex-col justify-start items-center h-full w-full bg-violet-200 py-2 overflow-scroll">
                {props.initialIncomeInputBox()}
                {props.combinedBillList}
            </div>
            </div>
    ); 
}
export default BillList;