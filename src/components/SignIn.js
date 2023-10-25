import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Note: useNavigation was changed to useHistory, which is commonly used in `react-router-dom`
import { useAuth } from '../context/AuthContext';
const SignIn = (props) => {
   

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, error} = useAuth();
    
    // handle login
    // Note: this function was added to handle login
    const hadleLogin = () => {
        onLogin(email, password); 
    }
 

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    />
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button 
                        type="submit"
                        className="w-full p-2 bg-violet-500 text-white rounded hover:bg-violet-600"
                        onClick={() => hadleLogin()}
                    >
                        Sign In
                    </button>
            </div>
        </div>
    );
};

export default SignIn;
