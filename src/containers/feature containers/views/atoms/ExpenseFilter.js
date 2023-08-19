// import React and useState from react
import { useState } from 'react';

// Create a react component that has buttons to filter expenses and stores it in a useState hook
const ExpenseFilter = ({ filterBills }) => {
    // set state for the expense filter
    const [expenseFilterState, setExpenseFilterState] = useState({
        all: true,
        paid: false,
        unpaid: false,
        due_soon: false,
        ascending: true,
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
        filterBills(expenseFilter, new Date(endDate));

    }

    const handleChangeendDate = (expensefilter,e) => {
        setEndDate(e.target.value);
        filterBills(expensefilter, new Date(endDate));
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
    // set endDate to today + 60 days 
    const today = new Date();
    const endDate2 = new Date(today);
    endDate2.setDate(endDate2.getDate() + 30);
    const [endDate, setEndDate] = useState(endDate2.toISOString().slice(0, 10));
    // UTC String format is 
    

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate() + 1,
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day + 1;

        return [month, day, year].join('/');
    }


    // return a div with buttons to filter expenses
    return (
        <div className="flex flex-row justify-center items-center h-1/6 w-full ">
            {/* Date Picker */}
            <div className="flex flex-col justify-start">
                <p> Today </p>
            <p className={`flex flex-row bg-violet-100 px-5 rounded-lg mx-2 font-bold  text-right text-gray-400`}
            > {formatDate(today)} </p>
            </div>
            <div className="flex flex-col justify-start">
                <p> - </p>
            <br/>
            </div>

            <div className="flex flex-col justify-start">
            <p> End Date </p>
            <input
                className={`flex flex-row bg-violet-100 rounded-lg mx-2 font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-center text-gray-400`}
                type="date"
                id="due-date"
                value={endDate.slice(0,10)}
                onChange={(e) => handleChangeendDate("endDate",e)}
               
            />
            </div>
            <button className={`${changeColor("ascending")} flex flex-col justify-center items-center`} onClick={() => handleExpenseFilter("ascending")}>
                <p className="text-md px-6"> All </p>
            </button>
            <button className={`${changeColor("paid")} flex flex-col justify-center items-center `} onClick={() => handleExpenseFilter("paid")}>
                <p className="text-md px-6"> Paid </p>
            </button>
            <button className={`${changeColor("unpaid")} flex flex-col justify-center items-center`} onClick={() => handleExpenseFilter("unpaid")}>
                <p className="text-md px-6"> Unpaid </p>
            </button>
        
        </div>
    );
}
export default ExpenseFilter;

