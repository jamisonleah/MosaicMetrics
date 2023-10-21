import { useState } from "react";    

const Navigation = () => {
    const [currentPage, setCurrentPage] = useState("calendar");

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-row justify-center items-center w-full h-16 bg-gray-800 text-white">
        {/* Create Horizontal Navigation Bar */}
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
    ); 
}

export default Navigation;
