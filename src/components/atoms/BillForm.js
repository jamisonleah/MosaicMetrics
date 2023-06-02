import React, { useState } from 'react';

const BillForm = (props) => {
  const [bill, setBill] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [hidden, setHidden] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [frequency, setFrequency] = useState('monthly');

  const [color, setColor] = useState(
    'bg-violet-500 hover:bg-violet-700'
  );

  

  const handleSubmit = () => {
    setColor('bg-green-500 hover:bg-green-700');
    props.handleaddBill(bill, dueDate, amount);
    hideBill();
  };



  const hideBill = () => {
    setHidden(!hidden);
  }

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + (d.getDate() + 1);
    const year = d.getFullYear();


    return [month, day, year].join('-');
  };

  //create a dropdown menu for the bill frequency
  const frequencyDropdown = () => {
    return (
      <select
        className="border p-3 border-gray-200 bg-gray-200 w-full rounded-xl text-gray-400 text-right hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
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

  

  const hiddenBill = () => {
    if (hidden) {
      return (
        <div className={`${color} border-violet-900 p-3 flex grid-flow-col rounded-xl w-full shadow-md`}> 
        <button className={`p-2 w-full text-white text-xs rounded-xl`} onClick={hideBill}>
         <p className='float-left'> {bill} </p>
         <p className='float-right'> {formatDate(dueDate)} </p>

        </button>
        </div>
      )
    }
    else {
      return (
          <table className="">
            <tr>
            <td className="py-3">
                <input
                  className="border p-3 border-gray-200 bg-gray-200 w-full rounded-xl text-right text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                  type="text"
                  id="bill"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  placeholder="Bill Name"
                />
              </td>
            </tr>
            <tr>
              <td className="py-3">
                <input
                  className="border p-3 border-gray-200 bg-gray-200 w-full rounded-xl  text-gray-700 text-right hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                />
              </td>
            </tr>
            <tr>
            <td className="py-3">
                <input
                  className="border p-3 border-gray-200 bg-gray-200 w-full rounded-xl  text-gray-400 text-right hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                  type="date"
                  id="due-date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </td>
              </tr> 
              <tr>
              <td className="py-3">
                {frequencyDropdown()}
                </td>

              </tr>
              <tr>
              <td className="py-3">
                <button onClick={() => handleSubmit() }className="bg-indigo-500 hover:bg-indigo-700 p-3 w-full text-white text-xs rounded-xl">
                  Submit
                </button>
              </td>
            </tr>
          </table>

      );
    }
  }
  return (
    hiddenBill() 

  );
};
export default BillForm;

