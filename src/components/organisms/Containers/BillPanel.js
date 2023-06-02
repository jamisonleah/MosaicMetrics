//import react and useState
import React, { useState } from 'react';
//import the bill form component
import BillForm from '../../atoms/BillForm';
//import checkbox checked and unchecked icons
import ExpenseFilter from '../../atoms/ExpenseFilter';

// create a function that stores a list of bills submitted by the user using the bill form component
const BillPanel = () => {

    const names = ['Rent', 'Car Payment', 'Car Insurance', 'Groceries', 'Utilities', 'Internet', 'Phone', 'Cable', 'Gym Membership', 'Netflix', 'Amazon Prime', 'Spotify', 'Student Loan', 'Credit Card', 'Medical'];

    const [filterState, setFilterState] = useState("All");

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomDate() {
        let start = new Date(2023, 5, 1);
        let end = new Date(2023, 5, 30);
        // turn into string date into string 

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
    }

    //initialize a list of bills
    const initialBillState = () => {
        let bills = [];
        for (let i = 0; i < names.length; i++) {
            let bill = {
                name: names[i],
                amount: getRandomInt(50, 500),
                dueDate: getRandomDate(),
                paid: false,
            }
            bills.push(bill);
        }
        return bills;
    }
    // initialize a list of bills
        const [billState, setBillState] = useState({
            bills: initialBillState(),
        });
        const [tempBillState, setTempBillState] = useState({
            bills: billState.bills,
        });

        //create a function to handle the bill panel
        const handleBill = (bill) => {
            setBillState({
                bills: billState.bills.concat(bill),
            });
        }

        //create a function to delete a bill from the list of bills
        const deleteBill = (bill) => {
            setBillState({
                bills: billState.bills.filter((b) => b !== bill),
            });
        }

        //create a function to calculate the total amount of bills
        const totalBills = () => {
            let total = 0;
            for (let i = 0; i < billState.bills.length; i++) {
                total += billState.bills[i].amount;
            }
            return total;
        }
        

        //create function that takes in a text date (YYYY-MM-DD) and returns the first 3 letters of the month and the day
        const formatDate = (date) => {
            let month = date.slice(5, 7);
            let day = date.slice(8, 10);
            let monthName = '';
            switch (month) {
                case '01':
                    monthName = 'Jan';
                    break;
                case '02':
                    monthName = 'Feb';
                    break;
                case '03':
                    monthName = 'Mar';
                    break;
                case '04':
                    monthName = 'Apr';
                    break;
                case '05':
                    monthName = 'May';
                    break;
                case '06':
                    monthName = 'Jun';
                    break;
                case '07':
                    monthName = 'Jul';
                    break;
                case '08':
                    monthName = 'Aug';
                    break;
                case '09':
                    monthName = 'Sep';
                    break;
                case '10':
                    monthName = 'Oct';
                    break;
                case '11':
                    monthName = 'Nov';
                    break;
                case '12':
                    monthName = 'Dec';
                    break;
                default:
                    monthName = 'Invalid Month';
                    break;
            }
            return monthName + ' ' + day;
        }


        // create a UI component that changes checkbox icon when clicked to checked or unchecked



        //create a function that toggles the paid status of a state bill
        const togglePaid = (bill) => {
            setBillState((prevState) => {
                return {
                    ...prevState,
                    bills: prevState.bills.map((b) =>
                        b === bill ? { ...b, paid: !b.paid } : b
                    ),
                };
            });
        };

        //create a function that filters the list of bills based on the filter selected and updates the useState of billList
        const filterBills = (filter) => {
            setBillState({
                bills: [...tempBillState.bills],
            });

            //filter by date due order
            if (filter === 'ascending') {
                setBillState({
                    bills: [...tempBillState.bills].sort((a, b) => {
                        return a.dueDate > b.dueDate ? 1 : -1;
                    }),


                });
            } else if (filter === 'paid') {
                setBillState({
                    bills: [...tempBillState.bills].filter((bill) => bill.paid),
                });
            } else if (filter === 'unpaid') {
                setBillState({
                    bills: [...tempBillState.bills].filter((bill) => !bill.paid),
                });
            }
            else if (filter === 'all') {
                setBillState({
                    bills: [...tempBillState.bills]
                });
            }
            else {
                // show all bills due in the next two weeks 
                let today = new Date();
                let twoWeeks = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));
                let twoWeeksString = twoWeeks.toISOString().split('T')[0];
                setBillState({
                    bills: [...tempBillState.bills].filter((bill) => bill.dueDate <= twoWeeksString),
                });
            }
            
        };







        //create a function that changes the color of the bill based on whether it is paid or not
        const paidColor = (bill) => {
            if (bill.paid) {
                return 'bg-green-600';
            } else {
                return 'bg-violet-400';
            }
        }




        const colors = ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-indigo-400', 'bg-purple-400'];
        // create a UI component that displays the list of bills
        const billList = billState.bills.map((bill, i) => (
            <div className={`flex flex-row  h-15 w-5/6 ${paidColor(bill)} rounded-lg py-2 px-5 my-1 font-bold `}>
                <div className={`h-4 w-4 rounded-full ${colors[i % colors.length]} mr-4`}></div>
                <div className="flex flex-row justify-between items-center w-5/6">
                    <p className="text-sm w-3/6 text-left"> {bill.name} </p>
                    <p className="text-sm w-1/6 text-left"> ${bill.amount} </p>
                    <p className="text-sm w-1/6 text-left"> {formatDate(bill.dueDate)} </p>
                    <input
                        type="checkbox"
                        id="checkbox"
                        checked={bill.paid}
                        onChange={() => togglePaid(bill)}
                        className="form-checkbox h-5 w-5 accent-violet-500"
                    />
                </div>
            </div>
        ));



        // return the bill panel component
        return (
            billState.bills.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full w-full  bg-lime-300 ">
                    <div className="flex flex-row font-bold justify-start items-center h-1/12 w-full bg-violet-200 border-violet-300 border-b-2 border-l-2 py-2 px-5">
                        <ExpenseFilter filterBills={filterBills} />           
                    </div>
                    <div className="flex flex-col justify-start items-center h-full w-full bg-violet-200 border-violet-300 border-b-2 border-l-2 py-2 overflow-scroll">
                        <p> No bills to display </p>
                    </div>
                    <div className="flex flex-row font-bold justify-start items-center h-1/12 w-full bg-violet-200 border-violet-300 border-b-2 border-l-2 py-2 px-5">
                        <p className="text-md w-5/6 text-left"> Total </p>
                        <p className="text-md w-1/6 text-right"> ${totalBills()} </p>
                    </div>

                    <div className="flex flex-col justify-center items-center h-1/2 w-full bg-violet-200 border-l-2 border-violet-300">
                        <BillForm handleBill={handleBill} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-full w-full  bg-lime-300 ">
                    <div className="flex flex-row font-bold justify-start items-center h-1/12 w-full bg-violet-200 border-violet-300 border-b-2 border-l-2 py-2 px-5">
                        <ExpenseFilter filterBills={filterBills} />           
                    </div>
                    <div className="flex flex-col justify-start items-center h-full w-full bg-violet-200 border-violet-300 border-b-2 border-l-2 py-2 overflow-scroll">
                        {billList}
                    </div>
                    <div className="flex flex-row font-bold justify-start items-center h-1/12 w-full bg-violet-200 border-violet-300 border-b-2 border-l-2 py-2 px-5">
                        <p className="text-md w-5/6 text-left"> Total </p>
                        <p className="text-md w-1/6 text-right"> ${totalBills()} </p>
                    </div>

                    <div className="flex flex-col justify-center items-center h-1/2 w-full bg-violet-200 border-l-2 border-violet-300">
                        <BillForm handleBill={handleBill} />
                    </div>
                </div>
            )
        );
    }
    export default BillPanel;