import React, { useState } from 'react';

const IncomeHandler = ({incomeState, handleIncome}) => {
    const [amount, setAmount] = useState(incomeState.amount); 
    const [frequency, setFrequency] = useState(incomeState.frequency);
    const [dueDate, setDueDate] = useState(incomeState.dueDate);
    //create a function to handle the bill form and returns the bill as an object with the name, amount, due date, frequency, and paid status
    const handleSubmit = () => {
        handleIncome({
            amount: amount,
            frequency: frequency,
            dueDate: dueDate
        });
    };

    //create a dropdown menu for the bill frequency
    const frequencyDropdown = () => {
        return (
            <select
                className={`flex flex-row h-2/6 w-full bg-violet-100 rounded-lg py-2 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-right text-gray-400`}
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder={incomeState.frequency}
            >
                <option value="monthly">Monthly</option>
                <option value="biweekly">Biweekly</option>
                <option value="weekly">Weekly</option>
                <option value="Custom">Custom</option>
            </select>
        );
    };

    return (
        <table className="w-4/6">
            <tr>
                <td className="my-2">
                    <input
                        className={`flex flex-row h-2/6 w-full bg-violet-100 rounded-lg py-2 px-5 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-right text-gray-400 disabled`}
                        type="text"
                        id="bill"
                        value="Income"
                        placeholder="Bill Name"
                    />
                </td>
            </tr>
            <tr>
                <td className="my-2">
                    <input
                        className={`flex flex-row h-2/6 w-full bg-violet-100 rounded-lg py-2 px-5 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-right text-gray-400`}
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={incomeState.amount}
                    />
                </td>
            </tr>
            <tr>
                <td className="my-2">
                    <input
                        className={`flex flex-row h-2/6 w-full bg-violet-100 rounded-lg py-2 px-5 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-right text-gray-400`}
                        type="date"
                        id="due-date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        placeholder={incomeState.dueDate}
                    />
                </td>
            </tr>
            <tr>
                <td className="my-2">
                    {frequencyDropdown()}
                </td>
            </tr>
            <tr>
                <td className="my-2">
                    <button
                        className={`flex flex-row justify-center items-center h-2/6 w-full bg-lime-500 rounded-lg py-2 px-5 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-lime-800  text-lime-900 hover:bg-lime-500 hover:text-lime-900`}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Save Income
                    </button>

                </td>
            </tr>

        </table>
    );

};
export default IncomeHandler;

