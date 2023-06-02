import React, { useState } from 'react';

const BillForm = (props) => {
  const [bill, setBill] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [frequency, setFrequency] = useState('monthly');

  //create a function to handle the bill form and returns the bill as an object with the name, amount, due date, frequency, and paid status
  const handleSubmit = () => {
    props.handleBill({
      name: bill,
      amount: parseFloat(amount),
      dueDate: dueDate,
      frequency: frequency,
      paid: false,
    });
    setBill('');
    setAmount('');
    setDueDate('');
    setFrequency('monthly');
  };



  //create a dropdown menu for the bill frequency
  const frequencyDropdown = () => {
    return (
      <select
        className={`flex flex-row h-2/6 w-full bg-violet-100 rounded-lg py-2 px-5 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-right text-gray-400`}
        id="frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="monthly">Monthly</option>
        <option value="biweekly">Biweekly</option>
        <option value="weekly">Weekly</option>
        <option value="Custom">Custom</option>
      </select>
    );
  };

  return (
    <table className="">
      <tr>
        <td className="my-2">
          <input
            className={`flex flex-row h-2/6 w-full bg-violet-100 rounded-lg py-2 px-5 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-right text-gray-400`}
            type="text"
            id="bill"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="Bill Name"
          />
        </td>
      </tr>
      <tr>
        <td className="my-2">
          <input
            className={`flex flex-row h-2/6 w-full bg-violet-100 rounded-lg py-2 px-5 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-right text-gray-400`}
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </td>
      </tr>
      <tr>
        <td className="my-2">
          <input
            className={`flex flex-row h-2/6 w-full bg-violet-100 rounded-lg py-2 px-5 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50 text-right text-gray-400`}
            type="date"
            id="due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </td>
      </tr>
      <tr>
        <td className="my-2">
          {frequencyDropdown()}
        </td>
      </tr>
      <tr>
        <td className="my-2">
          <button
            className={`flex flex-row justify-center items-center h-2/6 w-full bg-violet-400 rounded-lg py-2 px-5 my-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-500  text-violet-600 hover:bg-violet-500 hover:text-white`}
            type="submit"
            onClick={handleSubmit}
          >
            Add Bill
          </button>

        </td>
      </tr>

    </table>
  );

};
export default BillForm;

