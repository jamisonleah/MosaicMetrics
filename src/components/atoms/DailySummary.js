import React, { useState } from "react";
import {BiLockOpen} from "react-icons/bi";
const DailySummary = (props) => {
    //props.income 
    //props.bills 
    const [funds, setFunds] = useState(props.income.checkings);


    const dailyCalc = () => {
        let today = new Date();
        let tempMoney = props.income.checkings;
        let total = 0;
        total = addIncome(tempMoney);

    }

    const addIncome = (tempMoney) => {
        //add income to checkings
    }

    const subtractBills = () => {
        //subtract bills from checkings
    }



    return (
        <div className="bg-lime-200 p-3 mr-4 rounded-lg shadow-md w-full">
            <h1 className="text-gray-700 font-medium text-xs"> Daily Summary </h1>
            <p> {props.bankbalance} </p>
        </div>
    );
};
export default DailySummary;
