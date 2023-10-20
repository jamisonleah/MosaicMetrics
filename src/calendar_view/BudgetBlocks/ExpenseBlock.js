import { useState } from "react";
/*
    ExpenseBlock component that displays a single expense in a block.
    @param {Object} expense - The expense to display.
    property {string} name - The name of the expense.
    property {number} amount - The amount of the expense.
    property {string} description - The description of the expense.
    @returns {JSX.Element} The rendered ExpenseBlock component.

*/
const ExpenseBlock = ({ expense }) => {
    return (
        <div className="flex items-center w-full p-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-200 ease-in-out">
            {/* Placeholder for an icon (like a shopping cart or wallet) */}
            <div className="mr-3 bg-red-200 p-2 rounded-full">
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                    <path d="M16.2 7l-1.68-5.04A2 2 0 0012.52 1H7.48a2 2 0 00-1.92 1.96L4 7H0v2h1l1.87 9.28A2 2 0 004.8 19h10.4a2 2 0 001.93-1.72L19 9h1V7h-3.8z"></path>
                </svg>
            </div>

            <div>
                <h2 className="text-xl mb-1">{expense.name}</h2>
                <p className="text-lg text-red-400">-${expense.amount.toFixed(2)}</p>
                <p className="text-sm">{expense.description}</p>
            </div>
        </div>
    );
}


export default ExpenseBlock;