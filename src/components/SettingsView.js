import { useState } from 'react';
import ManageExpenses from './userSettings/ManageExpenses';
import ManageIncomes from './userSettings/ManageIncomes';
import ManageAccount from './userSettings/ManageAccount';
import Navigation from './Navigation';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const SettingsView = () => {
    const { budget, currentPage, setCurrentPage } = useContext(AuthContext);
    const [currentSubPage, setCurrentSubPage] = useState("manageExpenses");

    const handleSubPageChange = (subPage) => {
        setCurrentSubPage(subPage);
    }

    const renderSubPage = () => {
        switch (currentSubPage) {
            case "manageExpenses":
                return <ManageExpenses />
            case "manageIncomes":
                return <ManageIncomes />
            case "manageAccount":
                return <ManageAccount/>
            default:
                return <ManageExpenses />
        }
    }

    //change color of button when clicked
    const buttonColor = (subPage) => {
        if (currentSubPage === subPage) {
            return "bg-gray-700";
        } else {
            return "";
        }
    }


    return (
        <div className="flex flex-col w-11/12 h-full p-5 mx-auto border-2 border-violet-900 bg-gray-900 text-white rounded-lg shadow-lg font-Nunito">
            <Navigation userAccount={budget['user']} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <h1 className="text-3xl font-bold text-left my-6 mx-6">Settings</h1>
            <div className="flex w-full h-auto  text-white p-4">
                {/* Vertical Navigation Bar */}
                <div className="flex flex-col w-1/4 h-full rounded-lg bg-gray-800 text-gray-300" >
                    <button
                        className={`my-2 py-3 px-6 w-full text-left rounded ${buttonColor("manageExpenses")}`}
                        onClick={() => handleSubPageChange("manageExpenses")}
                    >
                        Manage Expenses
                    </button>
                    <button
                        className={`my-2 py-2 px-6 w-full text-left rounded-lg ${buttonColor("manageIncomes")}`}
                        onClick={() => handleSubPageChange("manageIncomes")}
                    >
                        Manage Income
                    </button>
                    <button
                        className={`my-2 py-2 px-6 w-full text-left rounded-lg ${buttonColor("manageUser")}`}
                        onClick={() => handleSubPageChange("manageAccount")}
                    >
                        Manage Account
                    </button>
                </div>

                {/* Center subPages  */}
        
                <div className="flex-grow items-center justify-center bg-slate-100 rounded-lg mx-auto">
                    {renderSubPage()}
                </div>
            </div>

        </div>
    );
}
export default SettingsView;
