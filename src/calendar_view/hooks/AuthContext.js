//Create a new context
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      "uid": null
    });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    const token_response = await getToken(email, password);
    if (token_response.status === 401) {
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
      setData(token_response['data']);
    }
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    navigate('/signin');
  };



  const authContextValue = {
    token,
    error,
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

