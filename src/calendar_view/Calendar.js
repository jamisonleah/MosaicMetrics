import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './hooks/AuthContext';
import { getBudget, initialBudget } from './hooks/BudgetController';
import ViewByDay from './ViewByDay';
import IncomeBlock from './BudgetBlocks/IncomeBlock';
import ExpenseBlock from './BudgetBlocks/ExpenseBlock';
/**
 * Calendar component that displays a monthly calendar with paydays marked based on budget data.
 * @returns {JSX.Element} The rendered Calendar component.
 */
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDayIncomes, setSelectedDayIncomes] = useState([]);
  const [selectedDayExpenses, setSelectedDayExpenses] = useState([]);
  const { token } = useContext(AuthContext);
  const [budget, setBudget] = useState(initialBudget);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetData = await getBudget(token);
        setBudget(budgetData);
        setSelectedDayIncomes(getPaydays(budgetData['incomes'], currentDate)); 
        setSelectedDayExpenses(getExpenseday(budgetData['expenses'], currentDate));
      } catch (error) {
        console.error('Error fetching budget data', error);
      }
    };

    fetchData();
  }, [token]);

  const randomHashIdfunction = (date) => {
    return Math.random().toString(36).substr(2, 9) + date;
  }
  /*
    getPaydays function
    - Takes in an array of incomes and a selected month
    - Returns an array of Date objects that represent paydays for the selected month
  */
  const getPaydays = (incomes, selectedMonth) => {
    const paydays = [];

    incomes.forEach((income) => {
      const [year, month, day] = income.start_date.split('-').map(Number);
      // Explicitly create a date object using local time
      const startDate = new Date(year, month - 1, day); // months are 0-indexed
      const endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0); // Last day of the selected month

      let currentDate = startDate;

      // Loop through all paydays between the start date and the end date
      while (currentDate <= endDate) {
        if (currentDate.getMonth() === selectedMonth.getMonth()) {
          paydays.push(
            {
              id: randomHashIdfunction(currentDate),
              name: income.title,
              amount: income.amount,
              description: income.description,
              start_date: new Date(currentDate) // Clone the date to avoid mutations
            }
          ); 
        }

        // Move to the next payday based on frequency
        switch (income.frequency) {
          case "Weekly":
            currentDate.setDate(currentDate.getDate() + 7);
            break;
          case "Bi-Weekly":
            currentDate.setDate(currentDate.getDate() + 14);
            break;
          case "Monthly":
            currentDate.setMonth(currentDate.getMonth() + 1);
            break;
          default:
            throw new Error(`Unsupported frequency: ${income.frequency}`);
        }
      }
    });

    return paydays;
  };

  /*
    getExpenseday function
    - Takes in an array of expenses and a selected month
    - Returns an array of Date objects that represent paydays for the selected month
  */
  const getExpenseday = (expenses, selectedMonth) => {
    const expensedays = [];

    expenses.forEach((expense) => {
      const [year, month, day] = expense.due_date.split('-').map(Number);
      // Explicitly create a date object using local time
      const startDate = new Date(year, month - 1, day); // months are 0-indexed
      const endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0); // Last day of the selected month

      let currentDate = startDate;

      // Loop through all paydays between the start date and the end date
      while (currentDate <= endDate) {
        if (currentDate.getMonth() === selectedMonth.getMonth()) {
          expensedays.push({
            id: expense.id,
            name: expense.name,
            amount: expense.amount,
            description: expense.description,
            due_date: new Date(currentDate) // Clone the date to avoid mutations
          });
          //add object to selectedDayExpenses
          
        }

        // Move to the next payday based on frequency
        
        switch (expense.frequency) {
          case "Weekly":
            currentDate.setDate(currentDate.getDate() + 7);
            break;
          case "Bi-Weekly":
            currentDate.setDate(currentDate.getDate() + 14);
            break;
          case "Monthly":
            currentDate.setMonth(currentDate.getMonth() + 1);
            break;
          default:
            throw new Error(`Unsupported frequency: ${expense.frequency}`);
        }
      }
    });

    return expensedays;
  };

  const markCalendar = (day, currentDate) => {
    const incomes = budget['incomes'] || [];
    const paydayDates = getPaydays(incomes, currentDate);

    const expenses = budget['expenses'] || [];
    // Map the due dates to an array of Date objects. Takes into account that months are 0-indexed and frequency of the expense based on first due_date and frequency
    const expenseDates = getExpenseday(expenses, currentDate);
    // some() returns true if at least one element in the array satisfies the condition
    const isPayday = paydayDates.some((payday) =>
      payday.start_date.getDate() === day &&
      payday.start_date.getMonth() === currentDate.getMonth() &&
      payday.start_date.getFullYear() === currentDate.getFullYear()
    );

    const isExpense = expenseDates.some((expense) =>
      expense.due_date.getDate() === day &&
      expense.due_date.getMonth() === currentDate.getMonth() &&
      expense.due_date.getFullYear() === currentDate.getFullYear()
    );

    const dayClassPayday = isPayday ? 'text-lime-500' : 'text-black';
    const dayClassExpense = isExpense ? 'text-red-500' : 'text-black';

    const today = new Date();
    const isToday = today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    //date thats being rendered
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return (
      <div
        key={day}
        className={`text-center rounded-full border-4 ${isToday ? 'border-lime-500' : 'border-lime-900'} hover:bg-lime-300 hover:cursor-pointer hover:border-lime-300 ${dayClassPayday} ${dayClassExpense}`}
        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
      >
        <span className={'text-center text-xl'}>{day}</span>
      </div>
    );
    
  };

  const renderCalendar = () => {
    let calendar = [];
    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // create blank days for the beginning of the calendar
    for (let i = 0; i < firstDay.getDay(); i++) {
      calendar.push(<div className="text-center text-lime-100" key={`blank-start-${i}`}></div>);
    }

    // create days for the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      calendar.push(markCalendar(day, currentDate));
    }

    // Optionally: if you want to fill the end of the month until the last Saturday
    // let lastDayOfWeek = lastDay.getDay();
    // for(let i = lastDayOfWeek + 1; i <= 6; i++) {
    //   calendar.push(<div className="text-center text-lime-100" key={`blank-end-${i}`}></div>);
    // }

    return calendar;
  }


  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };


  return (
    <div className="flex w-3/4 h-full p-5 flex-row mx-auto border-2 border-black">
      <div className="w-full h-full p-5 bg-lime-900 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <button
            className="text-lime-100 font-bold hover:text-gray-700"
            onClick={handlePrevMonth}
          >
            &lt;
          </button>
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            className="text-lime-100 font-bold hover:text-gray-700"
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-3 p-5 rounded-lg">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day =>
            <div key={day} className="text-center text-lime-100"><b>{day}</b></div>
          )}
          {renderCalendar()}
        </div>
      </div>
      <div className="w-1/2"> 
            <ViewByDay selectedDate={selectedDate} incomes={selectedDayIncomes} expenses={selectedDayExpenses}/>
            
      </div> 
    </div>
  );
};

export default Calendar;
