import Calendar from "./calendar_view/Calendar.js";
import SignIn from "./calendar_view/SignIn.js";
import { AuthProvider } from "./calendar_view/hooks/AuthContext.js";
import AuthRoute from "./calendar_view/hooks/AuthRoute.js";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

export default function App() {
 
  //provide the context to the app
  
  return (
    <BrowserRouter>

    <AuthProvider>
        <Routes>
          <Route index path="/" element={ <AuthRoute> <Calendar /> </AuthRoute>} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
    </AuthProvider>
    </BrowserRouter>

  );
}