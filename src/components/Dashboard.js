import React, { useState, useEffect, useContext } from 'react';
import Navigation from './Navigation';
import { AuthContext } from '../context/AuthContext';
import { getBudget } from '../services/backend_api/BudgetController';
import ViewByDay from './calendar/Day/ViewByDay';
import CalendarDisplay from './calendar/CalendarDisplay';
import AccountBlock from './budgetBlocks/AccountBlock';
import { calculateIncome, updateTotalIncome } from '../utils/incomeUtils';
import { getPaydays, getExpenseday } from '../utils/budgetUtils';
/**
 * Calendar component that displays a monthly calendar with paydays marked based on budget data.
 * 
 */
const Dashboard = () => {

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
  const [budget, setBudget] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0.00);
  const [userAccount, setUserAccount] = useState([]);

  // This effect will run whenever the token changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetData = await getBudget(token);
        setBudget(budgetData);
        setSelectedDayIncomes(getPaydays(budgetData['incomes'], currentDate));
        setSelectedDayExpenses(getExpenseday(budgetData['expenses'], currentDate));
        setUserAccount(budgetData['user']);
      } catch (error) {
        console.error('Error fetching budget data', error);
      }
    };

    fetchData();
  }, [token, currentDate]);

  // This effect will run whenever the accountAmounts change
  useEffect(() => {
    calculateIncome(accountAmounts, setTotalIncome);
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

    const dayClassPayday = isPayday ? 'text-lime-500 font-bold' : isExpense ? 'font-bold text-rose-400' : 'text-violet-100';


    const today = new Date();
    const isToday = today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    //date thats being rendered
    return (
      <div
        key={day}
        className={`text-center rounded-full border-4 ${isToday ? 'border-violet-200 font-bold' : 'border-violet-500'} hover:bg-violet-300 hover:cursor-pointer hover:border-violet-300 ${dayClassPayday}`}
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
    <div className="flex flex-col w-11/12 h-full p-5 mx-auto border-2 border-violet-500 bg-gray-900 text-white rounded-lg shadow-lg font-Nunito">
      <Navigation userAccount={userAccount} />

      <div className="flex flex-row flex-grow mt-4">
        <div className="flex flex-col w-1/3 h-full mx-2 text-white">
          {renderAccountBlocks()}
        </div>

        <CalendarDisplay
          currentDate={currentDate}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          renderCalendar={renderCalendar}
        />

        <div className="flex flex-col w-1/2 ml-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <ViewByDay selectedDate={selectedDate} incomes={selectedDayIncomes} expenses={selectedDayExpenses} totalIncome={totalIncome} />
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
