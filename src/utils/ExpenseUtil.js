import axios from "axios";

// Updated API request to include setAuthInfo function
export const postRequest = async (object, endpoint, token, setToken, setError) => {
    try {
        const response = await axios.post(
            `http://localhost:3001/${endpoint}/${object.id}`,
            object,
            {
                headers: {
                    'access-token': token["access-token"],
                    'client': token["client"],
                    'expiry': token["expiry"],
                    'token-type': token["token-type"],
                    'uid': token["uid"],
                }
            },
        );

        // Update the access token if it's present in the response headers
        const headers = response.headers;
        if (headers['access-token']) {
            setToken({
                'access-token': headers['access-token'],
                'client': headers['client'],
                'expiry': headers['expiry'],
                'token-type': headers['token-type'],
                'uid': headers['uid'],
            });
        }

        return response.data;
    }
    catch (error) {
        setError(error.response.data.errors.full_messages);
    }
}

export const putRequest = async (object, endpoint, token, setToken, setError) => {
    try {
        const response = await axios.put(
            `http://localhost:3001/${endpoint}`,
            object,
            {
                headers: {
                    'access-token': token["access-token"],
                    'client': token["client"],
                    'expiry': token["expiry"],
                    'token-type': token["token-type"],
                    'uid': token["uid"],
                }
            },
        );

        // Update the access token if it's present in the response headers
        const headers = response.headers;
        if (headers['access-token']) {
            setToken({
                'access-token': headers['access-token'],
                'client': headers['client'],
                'expiry': headers['expiry'],
                'token-type': headers['token-type'],
                'uid': headers['uid'],
            });
        }

        return response.data;
    }
    catch (error) {
       setError(error.response.data.errors.full_messages);
    }
}
