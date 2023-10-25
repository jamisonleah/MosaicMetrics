import Dashboard from "./components/Dashboard.js";
import SignIn from "./components/SignIn.js";
import { AuthProvider } from "./context/AuthContext.js";
import AuthRoute from "./utils/AuthRoute.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

export default function App() {
 
  //provide the context to the app
  
  return (
    <BrowserRouter>

    <AuthProvider>
        <Routes>
          <Route index path="/" element={ <AuthRoute> <Dashboard /> </AuthRoute>} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
    </AuthProvider>
    </BrowserRouter>

  );
}