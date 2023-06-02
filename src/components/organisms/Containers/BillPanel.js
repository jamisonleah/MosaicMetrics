//import react and useState
import React, { useState } from 'react';
//import the bill form component
import BillForm from '../../atoms/BillForm';
//import checkbox checked and unchecked icons
import ExpenseFilter from '../../atoms/ExpenseFilter';
import IncomeHandler from '../../atoms/IncomeHandler';

// create a function that stores a list of bills submitted by the user using the bill form component
const BillPanel = () => {

    const names = ['Rent', 'Car Payment', 'Car Insurance', 'Groceries', 'Utilities', 'Internet'];
    const [selectedItem, setSelectedItem] = useState({});
    const [initialIncomeInput, setInitialIncomeInput] = useState(0);

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

    function getRandomFrequency() {
        let frequency = ['monthly', 'biweekly', 'weekly'];
        return frequency[Math.floor(Math.random() * frequency.length)];
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
                frequency: getRandomFrequency(),
                category: 'expense',
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
    const amountDue = () => {
        let total = 0;
        for (let i = 0; i < billState.bills.length; i++) {
            if (billState.bills[i].paid === false) {
                total += billState.bills[i].amount;
            }
        }
        return total;
    }


    // get next Date function
    const getNextDate = (date, frequency) => {
        let nextDate = new Date(date);
        if (frequency === 'monthly') {
            nextDate.setMonth(nextDate.getMonth() + 1);
        }
        else if (frequency === 'biweekly') {
            nextDate.setDate(nextDate.getDate() + 14);
        }
        else if (frequency === 'weekly') {
            nextDate.setDate(nextDate.getDate() + 7);
        }
        return nextDate.toISOString().split('T')[0];
    }

     // initialize income state
     const [incomeState, setIncomeState] = useState({
        name: "income",
        amount: 2000,
        dueDate: '2023-06-01',
        paid: false,
        frequency: 'biweekly',
        category: 'income',
    });
    // initialize a list of incomes 
    const initializeIncomeState = (number) => {
        let incomes = [];
        let baseDate = new Date(incomeState.dueDate);
        for (let i = 0; i < number; i++) {
            let income = {
                name: "Paycheck",
                amount: incomeState.amount,
                dueDate: getNextDate(baseDate, incomeState.frequency),
                paid: false,
                frequency: incomeState.frequency,
                category: 'income',
            }
            incomes.push(income);
            baseDate = new Date(income.dueDate);
            
        }
        return incomes;
    }

      // initialize a list of incomes 
      const [incomeStateList, setIncomeStateList] = useState({
        incomes: initializeIncomeState(8),
    });

      // make a useState for combined list of bills and incomes
      const [combinedList, setCombinedList] = useState({
        combined: billState.bills.concat(incomeStateList.incomes).sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1),
    });


    const handleIncome = (income) => {
        const newIncomeState = {
            name: "income",
            amount: income.amount,
            dueDate: income.dueDate,
            paid: false,
            frequency: income.frequency,
            category: 'income',
        };
    
        const newIncomeStateList = {
            incomes: initializeIncomeState(8),
        };
        
        setIncomeState(newIncomeState);
        setIncomeStateList(newIncomeStateList);
    
        setCombinedList({
            combined: billState.bills.concat(newIncomeStateList.incomes).sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1),
        });
    }
    
  
   
    

   

// 


    // show income as blue and expenses regular color
    const pillColor = (item) => {
        if (item.category === 'income') {
            return 'blue';
        }
        else {
            return 'primary';
        }
    }
    

    
    

    const [incomeExpenseToggle, setIncomeExpenseToggle] = useState(true);

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

    //create a function that changes the paid status of a billState
    const changePaid = (bill) => {
        let tempBills = [...billState.bills];
        for (let i = 0; i < tempBills.length; i++) {
            if (tempBills[i] === bill) {
                tempBills[i].paid = !tempBills[i].paid;
            }
        }
        setBillState({
            bills: tempBills,
        });

        // //update due date based on frequency
        // if (bill.paid) {
        //     let newDate = new Date(bill.dueDate);
        //     if (bill.frequency === 'monthly') {
        //         newDate.setMonth(newDate.getMonth() + 1);
        //     } else if (bill.frequency === 'biweekly') {
        //         newDate.setDate(newDate.getDate() + 14);
        //     } else if (bill.frequency === 'weekly') {
        //         newDate.setDate(newDate.getDate() + 7);
        //     }
        //     bill.dueDate = newDate.toISOString().split('T')[0];

        // } else {
        //     let newDate = new Date(bill.dueDate);
        //     if (bill.frequency === 'monthly') {
        //         newDate.setMonth(newDate.getMonth() - 1);
        //     } else if (bill.frequency === 'biweekly') {
        //         newDate.setDate(newDate.getDate() - 14);
        //     } else if (bill.frequency === 'weekly') {
        //         newDate.setDate(newDate.getDate() - 7);
        //     }
        //     bill.dueDate = newDate.toISOString().split('T')[0];

        // }

        //update temp bill state
        setTempBillState({
            bills: tempBills,
        });

        //update bill state
        setBillState({
            bills: tempBills,
        });


    }

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
            if(selectedItem === bill){
                return 'bg-gray-700 text-gray-900 cursor-pointer hover:bg-gray-900 hover:text-gray-100';
            }
            return 'bg-gray-500 text-gray-700 hover:bg-gray-700 hover:text-gray-900 cursor-pointer';
        } 
        else if (selectedItem === bill) {
            return 'bg-violet-700 text-violet-900 cursor-pointer hover:bg-violet-900 hover:text-violet-100';
        }else if (bill.category === 'income') {
            return 'bg-amber-200 text-amber-900 cursor-pointer hover:bg-amber-600 hover:text-amber-100';
        }
        else {
            return 'bg-violet-400';
        }

    }

    const colors = ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-indigo-400', 'bg-purple-400'];
    const colorFrequency = (bill) => {
        if (bill.category === 'income') {
            return 'bg-lime-500';
        }
        else if (bill.paid) {
            return 'bg-gray-700';
        }
        else if (bill.frequency === 'monthly') {
            return 'bg-amber-500';
        } else if (bill.frequency === 'biweekly') {
            return 'bg-indigo-600';
        } else if (bill.frequency === 'weekly') {
            return 'bg-rose-700';
        }
    }

    // create a UI component that displays the list of bills
    const billList = billState.bills.map((bill, i) => (
        <div className={`flex flex-row  h-15 w-5/6 ${paidColor(bill)} rounded-lg py-2 px-5 my-1 font-bold `}>
            <div className={`h-4 w-4 rounded-full ${colorFrequency(bill)} mr-4`}></div>
            <div className="flex flex-row justify-between items-center w-5/6">
                <p className="text-sm w-3/6 text-left"> {bill.name} </p>
                <p className="text-sm w-1/6 text-left"> ${bill.amount} </p>
                <p className="text-sm w-1/6 text-left"> {formatDate(bill.dueDate)} </p>
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={bill.paid}
                    onChange={() => changePaid(bill)}
                    className="form-checkbox h-5 w-5 accent-green-800"
                />
            </div>
        </div>
    ));

    // create a UI component that displays the list of combined bills
    const combinedBillList = combinedList.combined.map((bill, i) => (
        <div className={`flex flex-row  h-15 w-5/6 ${paidColor(bill)} rounded-lg py-2 px-5 my-1 font-bold hover:bg-violet-600 hover:text-violet-900`} onClick={() => setSelectedItem(bill)}>
            <div className={`h-4 w-4 rounded-full ${colorFrequency(bill)} mr-4 my-1`}></div>
            <div className="flex flex-row justify-between items-center w-5/6">
                <p className="text-sm w-3/6 text-left"> {bill.name} </p>
                <p className="text-sm w-1/6 text-left"> ${bill.amount} </p>
                <p className="text-sm w-1/6 text-left"> {formatDate(bill.dueDate)} </p>
               {bill.category === 'expense' ? (
                    <input  
                        type="checkbox"
                        id="checkbox"
                        checked={bill.paid}
                        onChange={() => changePaid(bill)}   
                        className="form-checkbox h-5 w-5 accent-gray-800"
                    />
                ) : (
                    <div className="h-5 w-5"></div>
                )}

            </div>
        </div>
    ));


    const initialIncomeInputBox = () => {
        return(
        <div className={`flex flex-row h-full w-5/6 bg-violet-500 rounded-lg items-center p-2 font-bold`}>
            <div className={`h-4 w-4 rounded-full mr-4 my-1`}></div>
            <div className="flex flex-row justify-end w-5/6">
            <input
                        className={`flex flex-row h-1/2 w-3/6 bg-violet-100 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-right pr-2 text-gray-400`}
                        type="number"
                        id="initial income amount"
                        value={initialIncomeInput}
                        onChange={(e) => setInitialIncomeInput(e.target.value)}
                        placeholder="$0.00"
            />

            </div>
        </div>
        )
    }
     // create a function that calcuates the total amount of bills due until the selected bill is due
     const calculateTotalUntilSelected = () => {
        let total = 0;
        for(let i = 0; i< billState.bills.length; i++){
            if(billState.bills[i].dueDate <= selectedItem.dueDate && !billState.bills[i].paid){
                total += billState.bills[i].amount;
            }
        }
        return total;
    }

    // create a function to calcuate the difference between the total amount of bills and the total amount of income
    const calculateDifference = () => {
        let total = 0;
        let income = 0;
        for(let i = 0; i< combinedList.combined.length; i++){
            if(combinedList.combined[i].category === 'expense' && !combinedList.combined[i].paid && combinedList.combined[i].dueDate <= selectedItem.dueDate){
                total += combinedList.combined[i].amount;
            }
            else if(combinedList.combined[i].category === 'income' && combinedList.combined[i].dueDate <= selectedItem.dueDate){
                income += combinedList.combined[i].amount;
            }
        }
        return income - total;
    }
   
    const balanceColor = () => {
        if(calculateDifference() < 0){
            return 'text-red-500';
        }
        else if(calculateDifference() > 0){
            return 'text-lime-800';
        }
        else{
            return 'text-gray-900';
        }
    }




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
                    <p className="text-md w-1/6 text-right"> ${amountDue()} </p>
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
                    {initialIncomeInputBox()}
                    {combinedBillList}
                </div>
                <div className="flex flex-row font-bold justify-start items-center h-1/12 w-full bg-violet-200 border-violet-300 border-b-2 border-l-2 py-2 px-5">
                    
                    <p className="text-md w-5/6 text-left"> Amount Due </p>
                    <p className="text-md w-1/6 text-right text-pink-900"> ${calculateTotalUntilSelected()} </p>
                    <p className={`text-md w-5/6 text-center ${balanceColor()}`}> ${calculateDifference()} </p>
                    <p className="text-md w-1/6 text-right"> ${amountDue()} </p>
                </div>

                <div className="flex flex-col justify-center items-center h-1/2 w-full bg-violet-200 border-l-2 border-violet-300">
                       {incomeExpenseToggle ? <BillForm handleBill={handleBill} /> : <IncomeHandler handleIncome={handleIncome} incomeState={incomeState} />}
                    
                </div>
                <button onClick={() => setIncomeExpenseToggle(!incomeExpenseToggle)}>Toggle</button>

            </div>

        )
    );
}
export default BillPanel;