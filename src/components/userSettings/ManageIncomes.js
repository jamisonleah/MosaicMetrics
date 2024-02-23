import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ManageIncomes = () => {

    const { budget } = useContext(AuthContext);

    const [incomes, setIncomes] = useState(budget['incomes']);
    const [incomeName, setIncomeName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    
    const addIncome = () => {
        if (editingIndex !== null) {
            const newIncomes = [...incomes];
            newIncomes[editingIndex] = { incomeName, frequency, incomeAmount };
            setIncomes(newIncomes);
            setEditingIndex(null);
        } else {
            setIncomes(prevIncomes => [...prevIncomes, { incomeName, frequency, incomeAmount }]);
        }
        setIncomeName('');
        setFrequency('');
        setIncomeAmount('');
    }

    const startEditing = (index) => {
        const income = incomes[index];
        setIncomeName(income.incomeName);
        setFrequency(income.frequency);
        setEditingIndex(index);
    }

    const deleteIncome = (index) => {
        const newIncomes = [...incomes];
        newIncomes.splice(index, 1);
        setIncomes(newIncomes);
    }

    return (
        <div className="p-8 w-full mx-auto text-black grid grid-cols-2 gap-4">

            <div>
                <div className="mb-2">
                    <label className="block mb-2 text-gray-600">Income Name</label>
                    <input
                        type="text"
                        value={incomeName}
                        onChange={(e) => setIncomeName(e.target.value)}
                        className="p-2 w-full border rounded"
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
                <div className="mb-2">
                    <label className="block mb-2 text-gray-600">Amount</label>
                    <input
                        type="text"
                        value={incomeAmount}
                        onChange={(e) => setIncomeAmount(e.target.value)}
                        className="p-2 w-full border rounded"
                    />
                </div>

                <button
                    onClick={addIncome}
                    className="p-2 bg-green-500 text-white rounded"
                >
                    {editingIndex !== null ? "Edit" : "Add"}
                </button>
            </div>
            <div>
                <ul className="list-disc">
                    {incomes.map((income, index) => (
                       <li key={index} className="flex p-4 border border-violet-500 bg-violet-500 rounded justify-between items-start mt-3">
                       <div>
                         <h2 className="text-lg font-bold">{income.title}</h2>
                         <p>Frequency: {income.frequency}</p>
                         <p>Amount: {income.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                       </div>
                       <div className="space-y-2">
                         <button
                           onClick={() => startEditing(index)}
                           className="p-1 bg-yellow-500 text-white rounded w-full hover:bg-yellow-600"
                         >
                           Edit
                         </button>
                         <br />
                         <button
                           onClick={() => deleteIncome(index)}
                           className="p-1 bg-red-500 text-white rounded w-full hover:bg-red-600"
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
}

export default ManageIncomes;

