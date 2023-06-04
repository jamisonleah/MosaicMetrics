// import React and useState from react
import { useState } from 'react';

// Create a react component that has buttons to filter expenses and stores it in a useState hook
const ExpenseFilter = ({filterBills}) => {
    // set state for the expense filter
    const [expenseFilterState, setExpenseFilterState] = useState({
        all: true,
        paid: false,
        unpaid: false,
        due_soon: false,
        ascending: false,
    });

    //create a function to handle the expense filter
    const handleExpenseFilter = (expenseFilter) => {
        setExpenseFilterState({
            all: false,
            paid: false,
            unpaid: false,
            due_soon: false,
            ascending: false,
            [expenseFilter]: true,
        });
        filterBills(expenseFilter);

    }
    

    // function to change background color of selected page
    const changeColor = (expenseFilter) => {
        if (expenseFilterState[expenseFilter] === true) {
            return "bg-violet-400 rounded-lg cursor-pointer";
        }
        else {
            return "bg-violet-200 h-50 w-50 cursor-pointer";
        }
    }

    // return a div with buttons to filter expenses
    return (
        <div className="flex flex-row justify-center items-center h-1/6 w-full ">
            <button className={`${changeColor("all")} flex flex-col justify-center items-center `} onClick={() => handleExpenseFilter("all")}>
                <p className="text-md px-6"> All </p>
            </button>
            <button className={`${changeColor("paid")} flex flex-col justify-center items-center `} onClick={() => handleExpenseFilter("paid")}>
                <p className="text-md px-6"> Paid </p>
            </button>
            <button className={`${changeColor("unpaid")} flex flex-col justify-center items-center`} onClick={() => handleExpenseFilter("unpaid")}> 
                <p className="text-md px-6"> Unpaid </p>
            </button>
            <button className={`${changeColor("due_soon")} flex flex-col justify-center items-center`} onClick={() => handleExpenseFilter("due_soon") }>
                <p className="text-md px-6"> Two Weeks </p>
            </button>
            <button className={`${changeColor("ascending")} flex flex-col justify-center items-center`} onClick={() => handleExpenseFilter("ascending")}>
                <p className="text-md px-6"> Asc </p>
            </button>
        </div>
    );
}
export default ExpenseFilter;

