// ManageExpenses.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { postRequest, putRequest } from '../../utils/ExpenseUtil';

const ManageExpenses = () => {

  const { budget, token, setToken } = useContext(AuthContext);
  //change budget['expenses'] column name to match database

  const [expenses, setExpenses] = useState(budget['expenses']);
  const [expenseName, setExpenseName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [frequency, setFrequency] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseId, setExpenseId] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('errors would go here');
  const user_id = budget['expenses'][0]['user_id'];


  const addExpense = () => {
    if (editingIndex !== null) {
      const newExpenses = [...expenses];
      newExpenses[editingIndex] = { name: expenseName, due_date: dueDate, frequency: frequency, amount: expenseAmount };
      setExpenses(newExpenses);
      setEditingIndex(null);
    } else {
      setExpenses(prevExpenses => [...prevExpenses, { name: expenseName, due_date: dueDate, frequency: frequency, amount: expenseAmount }]);
    }
    postRequest(
      { name: expenseName, due_date: dueDate, frequency: frequency, amount: expenseAmount, user_id: user_id, descripton: expenseName },
      'expenses',
      token,
      setToken,
      setError
    );
    setExpenseName('');
    setDueDate('');
    setFrequency('');
    setExpenseAmount('');
  };

  //TODO: 
  const startEditing = (index) => {
    const expense = expenses[index];

    // Parse the date manually to avoid time zone issues
    const dateParts = expense.due_date.split('-'); // Assuming the date format is 'YYYY-MM-DD'
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are 0-indexed in JavaScript Dates
    const day = parseInt(dateParts[2], 10) - 1;


  setExpenseName(expense.name);
  setDueDate(new Date(year, month, day).toISOString().split('T')[0]);
  setFrequency(expense.frequency.toLowerCase());
  setExpenseAmount(expense.amount);
  setEditingIndex(index);
};

const deleteExpense = (index) => {
  const newExpenses = [...expenses];
  newExpenses.splice(index, 1);
  setExpenses(newExpenses);
}


const handleAmountChange = (e) => {
  // Allow only numbers and one dot
  const value = e.target.value;
  if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
    setExpenseAmount(value);
  }
};


const handleAmountBlur = () => {
  // Format the input to 2 decimal places on blur
  if (expenseAmount) {
    setExpenseAmount(parseFloat(expenseAmount).toFixed(2));
  }
};

const displayDate = (dueDate) => {
  // Format the date to Day of Week, Month Day, Year
  const date = new Date(dueDate);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

const formattedDate = (dueDate) => {
  const date = new Date(dueDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}


return (
  <div className="p-8 w-full mx-auto text-black grid grid-cols-2 gap-4">
    <div>
      <div className="mb-2">
        <label className="block mb-2 text-gray-600">Expense Name</label>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="p-2 w-full border rounded"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-2 text-gray-600">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 w-full border rounded"
        />
      </div>

      <label className="block mb-2 text-gray-600">Amount</label>
      <div className='mb-2 relative'>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-600">$</span>
        <input
          type="text" // change to text to better handle custom formatting
          value={expenseAmount}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
          className="pl-8 p-2 w-full border rounded"
          placeholder="0.00"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-2 text-gray-600">Frequency</label>
        <select

          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="p-2 w-full border rounded"
        >
          <option value="">Select Frequency</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
      </div>
      <br />
      <button onClick={addExpense} className="p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600">
        {editingIndex !== null ? 'Update Expense' : 'Add Expense'}
      </button>
      <div className="text-red-500">{error}</div>
    </div>

    <div className="mb-6">
      <ul className="mt-8 text-white bg-gray-700 rounded-lg shadow-lg p-4">

        {expenses.map((expense, idx) => (
          <li key={idx} className="flex p-4 border border-violet-500 bg-violet-500 rounded justify-between items-start mt-3">
            <div>
              <h2 className="text-lg font-bold">{expense.name}</h2>
              <div>
                <p>Due Date: {displayDate(expense.due_date)}</p>
                <p>Frequency: {expense.frequency}</p>
              </div>
              <p>Amount: {expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
            <div className="space-y-2 my-auto">
              <button
                onClick={() => startEditing(idx)}
                className="p-2 bg-yellow-500 text-white rounded w-full  hover:bg-yellow-600"
              >
                Edit
              </button>
              <br />
              <button
                onClick={() => deleteExpense(idx)}
                className="p-2 bg-red-500 text-white rounded w-full hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>

);
};

export default ManageExpenses;
