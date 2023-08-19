import React from "react";
import FireBaseAuthenticator from "../../controllers/atoms/FireBaseAuthenticator";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const authenticator = FireBaseAuthenticator();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        //TODO: Add error handling
        e.preventDefault();
        authenticator.signIn(email, password);
        navigate("/home");
    }

    //Test SignIn    
    const [error, setError] = React.useState(null); // Handle / display error


    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-violet-200">
            <h1 className="text-3xl font-bold text-gray-900"> Mosaic Metrics </h1>

            <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8 m-4">
                <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
                <form className="flex flex-col justify-center items-center">
                    <input
                        className="border border-gray-400 w-64 p-2 rounded mt-4"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="border border-gray-400 w-64 p-2 rounded mt-4"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* TODO: Add error handling */}
                    {/* Display error message if error is not null */}
                    {error && <p className="text-red-500">{error}</p>}
                    {/*End TODO: Add error handling */}


                    <button
                        className="bg-violet-500 text-white w-64 p-2 rounded mt-4"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </button>
                </form>
                <div className="flex flex-col justify-center items-center">
                    <Link to="/signup" className="text-blue-500 mt-4">
                        Don't have an account? Sign Up
                    </Link>                
                </div>

            </div>
        </div>
    );
}
export default SignIn;