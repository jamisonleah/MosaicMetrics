import { useState } from "react";

const IncomeBlock = ({ income }) => {
    return (
        <div className="flex items-center w-full p-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-200 ease-in-out">
            {/* Placeholder for an icon (like a music note) */}
            <div className="mr-3 bg-lime-200 p-2 rounded-full">
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                    <path d="M16 6v10c0 1.104-.896 2-2 2a1 1 0 01-1-1V5H5a2 2 0 00-2 2v8H1v2h2v1a3 3 0 003 3h9a4 4 0 004-4V6h-3z"></path>
                </svg>
            </div>
            <div>
                <h2 className="text-xl mb-1"> {income.title}</h2>
                <p className="text-lg"> ${income.amount.toFixed(2)}</p>
                <p className="text-sm"> {income.description}</p>
            </div>
        </div>
    );
}


export default IncomeBlock;