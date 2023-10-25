import { useEffect, useState } from "react";
import IncomeBlock from "../../budgetBlocks/IncomeBlock";
import ExpenseBlock from "../../budgetBlocks/ExpenseBlock";
/*
    props.incomes - An array of income objects.
    property {string} title - The title of the income.
    property {number} amount - The amount of the income.
    property {string} description - The description of the income.
    property {Date Object} start_date - The start date of the income.
    property {Date Object} end_date - The end date of the income.

    props.expenses - An array of expense objects.
    property {string} name - The name of the expense.
    property {number} amount - The amount of the expense.
    property {string} description - The description of the expense.
    property {Date Object} due_date - The start date of the expense.

*/
const ViewByDay = (props) => {

   //visibileIncome is the sum of the props.accounts list balances 
    const [netIncomeDay, setNetIncomeDay] = useState(0.00);
    const compareDates = (date1, date2) => {
        if (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()) {
            return true;
        } else {
            return false;
        }
    }
    const checkIfSameDay = (income, status) => {
        if (status === "income") {
            if (compareDates(income.start_date, props.selectedDate)) {
                return true;
            } else {
                return false;
            }
        } else if (status === "expense") {
            if (compareDates(income.due_date, props.selectedDate)) {
                return true;
            } else {
                return false;
            }
        }
    }

    const currentDate = new Date();


    const checkIfBeforeSelectedDate = (income, status) => {
        if (status === "income") {
            //
            if (income.start_date <= props.selectedDate && currentDate <= income.start_date) {
                return true;
            } else {
                return false;
            }
        } else if (status === "expense") {
            // 
            if (income.due_date <= props.selectedDate && currentDate <= income.due_date) {
                return true;
            } else {
                return false;
            }
        }
    }
    //useEffect is a hook that runs after the render method is called
    //
    useEffect(() => {
        setNetIncomeDay(calculateNetIncome());
    }, [props.totalIncome, props.selectedDate]);



  
    const renderBlocks = () => {
        const blocks = [];
        props.incomes.forEach((income) => {
            if (checkIfSameDay(income, "income")) {
                blocks.push(<IncomeBlock income={income} key={income.id}/>);
            }
        });
        props.expenses.forEach((expense) => {
            if (checkIfSameDay(expense, "expense")) {
                blocks.push(<ExpenseBlock expense={expense} key={expense.id} />);
            }
        });
        return blocks;
    }



    const calculateNetIncome = () => {
        let netIncome = 0;
        props.incomes.forEach((income) => {
            if (checkIfBeforeSelectedDate(income, "income")) {
                netIncome += income.amount;
            }
        });
        props.expenses.forEach((expense) => {
            if (checkIfBeforeSelectedDate(expense, "expense")) {
                netIncome -= expense.amount;
            }
        });
        return netIncome + props.totalIncome;
    }

    const renderDate = () => {
        if (props.selectedDate === null) {
            return "No date selected";
        } else {
            return props.selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
    }

   //function that calculates net income based on selected date and income/expenses taking from the account balance

    const renderAccountIncomes = () => {
       let netIncome = 0; 
       props.accounts.forEach((account) => {
           netIncome += account.balance;
       });
        return netIncome.toFixed(2);
    }

    return (
        <div>

            <h1 className="text-purple-100 font-bold text-center text-lg"> {renderDate()} </h1>


            {/* Total Income */}
            <div className="relative bottom-0 right-0 w-full h-auto p-3 bg-gray-800 text-white">
                <div className="text-center">
                    <h2 className="text-md font-bold mb-1">Total Income</h2>
                    <p className="text-sm"> {props.totalIncome}</p>
                </div>
            </div>
            <div className="relative bottom-0 right-0 w-full h-1/2 p-3 bg-gray-800 text-white">
                {renderBlocks()}
                <div className="text-4xl text-center"> 
                    {calculateNetIncome().toFixed(2) }
                </div> 
            </div>
        </div>
    );

}

export default ViewByDay;