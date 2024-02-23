//Create a new context
import { createContext, useContext, useState } from 'react';
import { API_URL } from '../constants/Constants';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBudget } from '../services/backend_api/BudgetController';

//Create a context object
export const AuthContext = createContext();

//Create Signin Function and get header bearer token
const getToken = async (email, password) => {
  //try catch block for axios request
  try {
    const response = await axios.post('http://localhost:3001/auth/sign_in', {
      email: email,
      password: password
    });
    //return the token
    return response;
  } catch (error) {
    return error.response;
  }
}
//Create a provider component
export const AuthProvider = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(
    {
      "access-token": null,
      "client": null,
      "expiry": null,
      "token-type": null,
      "uid": null,
    });
  const [budget, setBudget] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState("calendar");
  
  const login = async (email, password) => {
    const token_response = await getToken(email, password);
    if (token_response['status'] !== 200) {
      setError("Invalid email or password");
    }
    else {
      setToken(
        {
          "access-token": token_response['headers']["access-token"],
          "client": token_response['headers']["client"],
          "expiry": token_response['headers']["expiry"],
          "token-type": token_response['headers']["token-type"],
          "uid": token_response['headers']["uid"]
            
        });
        setBudget(await getBudget(token_response['headers']));
    }
    navigate('/');
  };
  const logout = () => {
    setToken(null);
    navigate('/signin');
  };
  const authContextValue = {
    token,
    setToken,
    budget,
    currentPage,
    setCurrentPage,
    error,
    setBudget,
    onLogin: login,
    ongLogout: logout,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );

}

//Create a consumer component
export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => {
  return useContext(AuthContext);
};

