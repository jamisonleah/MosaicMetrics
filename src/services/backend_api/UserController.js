import { API_URL } from '../../constants';


export const getBudget = async (token) => {
    const response = await fetch(`${API_URL}/me`, {
        headers: {
        'Content-Type': 'application/json',
        'access-token': token['access-token'],
        'client': token['client'],
        'uid': token['uid']
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch budget: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
}

export const getUserAccount = async (token) => {
    const response = await fetch(`${API_URL}/user`, {
        headers: {
        'Content-Type': 'application/json',
        'access-token': token['access-token'],
        'client': token['client'],
        'uid': token['uid']
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch user account: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};



    