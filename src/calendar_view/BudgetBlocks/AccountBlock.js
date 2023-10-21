import React, { useState } from 'react';

const AccountBlock = ({ account, updateTotalIncome, updateAccountBalance }) => {

    const [editing, setEditing] = useState(false);
    const [balance, setBalance] = useState(account.balance);

    const handleBlur = () => {
        setEditing(false);
        // Assume you have logic to update the balance of the account

        const updatedAccount = { ...account, balance: balance };

        // Inform the parent component of the update
        updateAccountBalance(updatedAccount);

        // If needed, also update the totalIncome (though you could handle this from the parent directly when accountAmounts change)
        updateTotalIncome(updatedAccount);
    };

    return (
        <div className="flex flex-col items-center w-1/2 h-1/2 p-4 m-2 bg-cyan-200 text-cyan-900 rounded-lg shadow-md font-Nunito">

            <h2 className="text-md font-bold underline">{account.type}</h2> {/* Either 'Checkings' or 'Savings' */}

            <div className="flex items-center w-full justify-between">
                {editing ? (
                    <input
                        className="w-full text-center font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent rounded-md bg-gray-100"
                        type="number"
                        value={balance.toFixed(2)}  // Using the local balance state
                        onChange={(e) => setBalance(parseFloat(e.target.value))}
                        onBlur={handleBlur}
                    />
                ) : (
                    <div className="flex-grow text-center cursor-pointer" onClick={() => { setEditing(!editing) }}>
                        <span className="text-lg font-bold">${balance.toFixed(2)}</span>
                    </div>
                )}
            </div>

            <p className="text-center text-xs font-Nunito">{account.description.toLowerCase()}</p>

        </div>
    );
}

export default AccountBlock;
