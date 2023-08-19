//Create main screen component. 
//This component will be the main screen of the application.

//import react libraries
import React from 'react';
import { useState } from 'react';
import  Navigation  from '../atoms/Navigation';
import BillPanel from './HomeView';
import ExpenseFilter from '../atoms/ExpenseFilter';
import FormPanel from '../molecules/FormPanel';


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
       <BillPanel />
       
    );
};
export default MainScreen;