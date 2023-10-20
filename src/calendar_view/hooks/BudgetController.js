import axios from "axios";

export const getBudget = async (token) => {
  try {
    const response = await axios.get("http://localhost:3001/me", {
      headers: {
        'access-token': token['access-token'],
        'client': token['client'],
        'expiry': token['expiry'],
        'token-type': token['token-type'],
        'uid': token['uid'],
      },
    });
    return response.data; // Assuming the response contains JSON data
  } catch (error) {
    throw error; // Rethrow the error so it can be handled where this function is called
  }
};

// Define an initial budget state or default values
export const initialBudget = {
  id: null,
  user_id: null,
  income: null,
  expenses: null,
};




