import React, { useState } from 'react';

const BankIntegration = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleIntegration = async () => {
    setLoading(true);
    // Call the bank API here to retrieve the balance
    // Let's assume the API returns a fake value for now
    const fakeBalance = 1000;
    setBalance(fakeBalance);
    setLoading(false);
  };

  const handleManualInput = (e) => {
    setBalance(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {loading ? (
        <div className="text-gray-700 font-medium mb-2">Loading...</div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="balance">
              Balance
            </label>
            <input
              className="border border-gray-400 p-2 w-full"
              type="number"
              id="balance"
              value={balance}
              onChange={handleManualInput}
            />
          </div>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-full mr-2"
            onClick={handleIntegration}
          >
            Integrate with Bank
          </button>
        </div>
      )}
    </div>
  );
};

export default BankIntegration;
