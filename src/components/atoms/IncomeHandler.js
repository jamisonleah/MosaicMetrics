import React, { useState } from "react";
import { BiLockOpen } from "react-icons/bi";

const IncomeHandler = (props) => {

    const [bills, setBills] = useState(props.bills);
    const [checkings, setCheckings] = useState('');
    const [paycheck, setPayCheck] = useState('');
    const [nextPayCheck, setNexPayCheck] = useState('');
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleBudget = (budget) => {
        console.log("Locking in budget: ", budget);
    };
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCalculations = () => {
        if (checkings && paycheck && nextPayCheck && selectedOption) {

            props.storeIncome(checkings, paycheck, nextPayCheck, selectedOption);

        }
        else {
            console.log("Missing input");
        }
    };


    return (
        <div className="bg-lime-200 p-3 mr-4 rounded-lg shadow-md w-full">
            <h1 className="text-gray-700 font-medium text-xs"> Checkings </h1>
            <div className="flex">
                <input
                    className="border pl-2 border-gray-400 w-full rounded-l-xl"
                    type="number"
                    onChange={(e) => setCheckings(e.target.value)}
                />
                <BiLockOpen className="text-white font-medium rounded-r-xl bg-violet-900 w-1/4 h-1/4 p-2 text-sm" onClick={() => handleBudget(checkings)} />
            </div>

            <label className="text-gray-700 font-medium text-xs"> Paycheck </label>
            <div className="flex">
                <input
                    className="border pl-2 border-gray-400 w-full rounded-l-xl"
                    type="number"
                    onChange={(e) => setPayCheck(e.target.value)}
                />
                <BiLockOpen className="text-white font-medium rounded-r-xl bg-violet-900 w-1/4 h-1/4 p-2 text-sm" onClick={() => handleBudget(checkings)} />
            </div>

            <label className="text-gray-700 font-medium text-xs"> Next Paycheck </label>
            <input
                className="border rounded-full px-2 border-gray-400"
                type="date"
                id="due-date"
                value={nextPayCheck}
                onChange={(e) => setNexPayCheck(e.target.value)}
            />



            <label className="text-gray-700 font-medium text-xs">Occurence</label>
            <select
                className="bg-white text-xs border border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
                value={selectedOption}
                onChange={handleOptionChange}
            >
                <option value="7">Weekly</option>
                <option value="14">Every Other Week</option>
                <option value="30">Monthly</option>
                <option value="Other">Other</option>
            </select>


            <button className="my-4 bg-lime-700 hover:bg-lime-900 p-2 w-full text-white text-xs rounded-xl" onClick={() => handleCalculations()}>
                Calculate
            </button>



        </div>
    );
};
export default IncomeHandler;