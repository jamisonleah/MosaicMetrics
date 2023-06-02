//Create main screen component. 
//This component will be the main screen of the application.

//import react libraries
import React from 'react';
import { useState } from 'react';
import  Navigation  from './Navigation';
import IncomeHandler from '../../atoms/IncomeHandler';
import BillForm from '../../atoms/BillForm';
import BillPanel from './BillPanel';


const MainScreen = () => {
    // set state for the main screen
    const [mainState, setMainState] = useState({
        home: false,
        calendar: false,
        bills: false,
        profile: false,
    });

    //create a function to handle the main screen
    const handleMain = (main) => {
        setMainState({
            home: false,
            calendar: false,
            bills: false,
            profile: false,
            [main]: true,
        });
    }

    //create a function that greets the user based on the time of day in the header 
    const greeting = () => {
        let today = new Date();
        let hour = today.getHours();
        if (hour < 12) {
            return "Good Morning";
        }
        else if (hour < 18) {
            return "Good Afternoon";
        }
        else {
            return "Good Evening";
        }
    }
    

    // return main screen with 3 columns: navigation, main content, and daily summary and a header above the last two columns 

    return (
        <div className="flex flex-row h-screen bg-violet-200 text-black">
            <Navigation />
            <div className="flex flex-col w-screen">
                <div className="flex flex-row h-11 bg-violet-200 border-b-2 border-violet-300">
                    <div className="flex flex-row pl-5 pt-1">
                        <h1 className="text-xl"> {greeting()} Leah </h1>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center h-5/6 bg-violet-100">
                    <div className="flex flex-col justify-center items-center h-full w-10/12 bg-lime-300">
                        <h1 className="text-4xl"> Main Content </h1>
                    </div>
                    <div className="flex flex-col justify-center items-center h-full w-3/6 bg-amber-300">
                       <BillPanel/>
                    </div>
                </div>
            </div>
        </div>
        


        
       
    );
};
export default MainScreen;