//import react libraries for a navigation bar
import React from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { useState } from 'react';

//create a navigation bar component
const Navigation = () => {
    //create a state for the navigation bar
    const [navState, setNavState] = useState({
        home: true,
        calendar: false,
        bills: false,
        profile: false,
    });

    //create a function to handle the navigation bar
    const handleNav = (nav) => {
        setNavState({
            home: false,
            calendar: false,
            bills: false,
            profile: false,
            [nav]: true,
        });
    }
    // function to change background color of selected page
    const changeColor = (nav) => {
        if (navState[nav] === true) {
            return "bg-violet-400 cursor-pointer";
        }
        else {
            return "bg-violet-200 h-50 w-50 cursor-pointer";
        }
    }



    //return left vertical navigation bar with icons and page names 
    return (
        <div className="flex flex-col h-screen w-2/12 bg-violet-200 text-black float-left border-violet-300 border-r-2 ">
            <div className={`${changeColor("home")} flex flex-col justify-center items-center py-8`}> 
                <BiHomeAlt className="text-4xl" onClick={() => handleNav("home")} />
                <p className="text-xs"> Home </p>
            </div>
            <div className={`${changeColor("calendar")} flex flex-col justify-center items-center py-8`}>
                <BsCalendar className="text-4xl" onClick={() => handleNav("calendar")} />
                <p className="text-xs"> Calendar </p>
            </div>
            <div className={`${changeColor("bills")} flex flex-col justify-center items-center py-8`}>
                <FaMoneyBillAlt className="text-4xl" onClick={() => handleNav("bills")} />
                <p className="text-xs"> Bills </p>
            </div>
            <div className={`${changeColor("profile")} flex flex-col justify-center items-center py-8`}>
                <AiOutlineUser className="text-4xl" onClick={() => handleNav("profile")} />
                <p className="text-xs"> Profile </p>
            </div>
        </div>
    );

};
export default Navigation;
