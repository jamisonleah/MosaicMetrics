

export const getUserAccount = async (token) => {
    const response = await fetch(`http://localhost:3001//user`, {
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

    