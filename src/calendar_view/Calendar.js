import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './hooks/AuthContext';
import { getBudget, initialBudget } from './hooks/BudgetController';
import ViewByDay from './ViewByDay';
import IncomeBlock from './BudgetBlocks/IncomeBlock';
import ExpenseBlock from './BudgetBlocks/ExpenseBlock';
import AccountBlock from './BudgetBlocks/AccountBlock';
import Navigation from './MainUXComponents/Navigation';

/**
 * Calendar component that displays a monthly calendar with paydays marked based on budget data.
 * 
 */
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDayIncomes, setSelectedDayIncomes] = useState([]);
  const [selectedDayExpenses, setSelectedDayExpenses] = useState([]);
  const [accountAmounts, setAccountAmounts] = useState([
    {
      id: 'checkings',
      type: 'Checkings',
      balance: 0,
      description: 'Your checking account'
    },
    {
      id: 'savings',
      type: 'Savings',
      balance: 0,
      description: 'Your savings account'
    }
  ]);

  const { token } = useContext(AuthContext);
  const [budget, setBudget] = useState(initialBudget);
  const [totalIncome, setTotalIncome] = useState(0.00);

  const updateTotalIncome = (income) => {
    let updatedTotalincome = 0.00;
    accountAmounts.forEach((account) => {
      if (account.id === income.id) {
        updatedTotalincome += income.balance;
      } else {
        updatedTotalincome += account.balance;
      }
    });
    setTotalIncome(updatedTotalincome);
    return updatedTotalincome;
  };

  // This effect will run whenever the token changes
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

  // This effect will run whenever the accountAmounts change
  useEffect(() => {
    calculateIncome();
  }, [accountAmounts]);


  const updateAccountBalance = (updatedAccount) => {
    setAccountAmounts(prevAccounts => {
      return prevAccounts.map(account =>
        account.id === updatedAccount.id ? updatedAccount : account
      );
    });
  };

  const renderAccountBlocks = () => {
    return accountAmounts.map(account => (
      <AccountBlock
        key={account.id}
        account={account}
        updateTotalIncome={updateTotalIncome}
        updateAccountBalance={updateAccountBalance}
      />
    ));
  };
  const calculateIncome = () => {
    let income = 0;
    accountAmounts.forEach((account) => {
      income += account.balance;
    });
    setTotalIncome(income);
    return income;
  };

  const randomHashIdfunction = (date) => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + date.getTime().toString(36);
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

    const dayClassPayday = isPayday ? 'text-lime-500 font-bold' : isExpense ? 'font-bold text-rose-400' : 'text-purple-100';


    const today = new Date();
    const isToday = today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    //date thats being rendered
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return (
      <div
        key={day}
        className={`text-center rounded-full border-4 ${isToday ? 'border-purple-200' : 'border-purple-900'} hover:bg-purple-300 hover:cursor-pointer hover:border-purple-300 ${dayClassPayday}`}
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
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDayIncomes(getPaydays(budget['incomes'], new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)));
    setSelectedDayExpenses(getExpenseday(budget['expenses'], new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDayIncomes(getPaydays(budget['incomes'], new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)));
    setSelectedDayExpenses(getExpenseday(budget['expenses'], new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)));
  };

  return (
    <div className="flex flex-col w-11/12 h-full p-5 mx-auto border-2 border-purple-700 bg-gray-900 text-white rounded-lg shadow-lg">
      <Navigation />

      <div className="flex flex-row flex-grow mt-4">
        <div className="flex flex-col w-1/2 h-full mx-2 text-white">
          {renderAccountBlocks()}
        </div>

        <div className="flex flex-col w-full h-full p-5 bg-purple-900 shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <button
              className="text-purple-200 font-bold hover:text-purple-400"
              onClick={handlePrevMonth}
            >
              &lt;
            </button>
            <h2 className="text-xl font-semibold text-purple-100">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              className="text-purple-200 font-bold hover:text-purple-400"
              onClick={handleNextMonth}
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-3 p-5 rounded-lg">
            
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day =>
                <div key={day} className="text-center text-purple-300 font-semibold">{day}</div>
              )}
              {renderCalendar()}
            
          </div>
        </div>

        <div className="flex flex-col w-1/2 ml-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <ViewByDay selectedDate={selectedDate} incomes={selectedDayIncomes} expenses={selectedDayExpenses} totalIncome={totalIncome} />
        </div>
      </div>
    </div>
  );
};


export default Calendar;
