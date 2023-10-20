import { useState } from "react";
import IncomeBlock from "./BudgetBlocks/IncomeBlock";
import ExpenseBlock from "./BudgetBlocks/ExpenseBlock";
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
            if(compareDates(income.due_date, props.selectedDate)){
                return true;
            } else {
                return false;
            }
        }
    }

    const renderBlocks = () => {
        const blocks = [];
        props.incomes.forEach((income) => {
            if (checkIfSameDay(income, "income")) {
                blocks.push(<IncomeBlock income={income} />);
            }
        });
        props.expenses.forEach((expense) => {
            if (checkIfSameDay(expense, "expense")) {
                blocks.push(<ExpenseBlock expense={expense} />);
            }
        });

        return blocks;
    }

    const renderDate = () => {
        if (props.selectedDate === null) {
            return "No date selected";
        } else {
            return props.selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
    }
    

    return (
        <div className="p-2 m-2">
            <h1 className="text-center text-2xl">View By Day</h1>
            <h1 className="text-lime-900 font-bold text-center text-lg"> {renderDate()} </h1>
            <div className="flex flex-wrap justify-center">
                {renderBlocks()}
            </div>
        </div>
    );

}

export default ViewByDay;