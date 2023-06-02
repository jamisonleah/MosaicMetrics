//import react and useState
import React, { useState } from 'react';
//import the bill form component
import BillForm from '../../atoms/BillForm';
//import checkbox checked and unchecked icons
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';


// create a function that stores a list of bills submitted by the user using the bill form component
const BillPanel = () => {
    //set state for the bill panel
    const [billState, setBillState] = useState({
        bills: [
            {
                name: 'Rent',
                amount: 1000,
                dueDate: '2021-09-25',
                frequency: 'Monthly',
                paid: false,
            },
            {
                name: 'Car Payment',
                amount: 300,
                dueDate: '2021-09-06',
                frequency: 'Monthly',
                paid: false,
            },
            {
                name: 'Car Insurance',
                amount: 100,
                dueDate: '2021-09-04',
                frequency: 'Monthly',
                paid: false,
            },
        ],
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
   


    //create a function that toggles paid status of a bill
    const togglePaid = (bill) => {
        setBillState({
            bills: billState.bills.map((b) => {
                if (b === bill) {
                    return {
                        ...b,
                        paid: !b.paid,
                    };
                }
                return b;
            }),
        });
    }

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
                onChange={ () => togglePaid(bill)}
                className="form-checkbox h-5 w-5 accent-violet-500"
            />
            </div>
        </div>
    ));
        


    // return the bill panel component
    return (
        billState.bills.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full w-full bg-lime-300">
                <div className="flex flex-col justify-center items-center h-1/2 w-1/2 bg-violet-300 rounded-lg">
                    <h1 className="text-xl"> You have no bills. </h1>
                </div>
                <div className="flex flex-col justify-center items-center h-1/2 w-1/2 bg-violet-300 rounded-lg">
                    <BillForm handleBill={handleBill} />
                </div>
            </div>
        ) : (
            <div className="flex flex-col justify-center items-center h-full w-full  bg-lime-300 ">
                <div className="flex flex-col justify-start items-center h-full w-full bg-violet-200 border-violet-300 border-b-2 border-l-2 py-2">
                  { billList }
                  <div className="flex flex-row justify-between items-center w-5/6 px-6">
                    <p className="text-md w-3/6 text-right"> Total </p>
                    <p className="text-md w-2/6 text-right"> ${totalBills()} </p>
                    </div>
                 
                </div>
                <div className="flex flex-col justify-center items-center h-1/2 w-full bg-violet-200 border-l-2 border-violet-300">
                    <BillForm handleBill={handleBill} />
                </div>
            </div>
        )
    );
}
export default BillPanel;