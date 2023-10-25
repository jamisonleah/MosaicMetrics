import { useState } from "react";

const Navigation = ({userAccount}) => {
    const [currentPage, setCurrentPage] = useState("calendar");

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleLogout = () => {
        // handle logout logic here
    };

    return (
        <div className="flex flex-row justify-between items-center w-full h-16 bg-gray-800 text-white">
            {/* Create Horizontal Navigation Bar */}
            <div>
                <button 
                    onClick={() => handlePageChange("calendar")} 
                    className={`mx-4 py-2 px-6 rounded ${currentPage === "calendar" ? "bg-gray-700" : ""}`}
                >
                    Calendar
                </button>
                <button 
                    onClick={() => handlePageChange("reports")} 
                    className={`mx-4 py-2 px-6 rounded ${currentPage === "reports" ? "bg-gray-700" : ""}`}
                >
                    Reports
                </button>
                <button 
                    onClick={() => handlePageChange("settings")} 
                    className={`mx-4 py-2 px-6 rounded ${currentPage === "settings" ? "bg-gray-700" : ""}`}
                >
                    Settings
                </button>
            </div>
            <div className="flex flex-row items-center">
                <h1 className="mr-4"> Hello! {userAccount.name} </h1>
                <button onClick={handleLogout} className="mx-4 py-2 px-6 rounded bg-violet-500 text-white">Logout</button>
            </div>
        </div> 
    ); 
}

export default Navigation;
