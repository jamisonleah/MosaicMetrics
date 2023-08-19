import React from "react";
import FireBaseAuthenticator from "../../controllers/atoms/FireBaseAuthenticator";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const authenticator = FireBaseAuthenticator();

    const [error, setError] = React.useState(null); // Handle / display error

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password === passwordConfirm) {
            authenticator.signUp(email, password); // Call the signUp function
        } else {
            // Handle password mismatch error
            setError("Passwords do not match");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-violet-200">
            <h1 className="text-3xl font-bold text-gray-900"> Mosaic Metrics </h1>

            <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8 m-4">
                <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
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
                    <input
                        className="border border-gray-400 w-64 p-2 rounded mt-4"
                        type="password"
                        placeholder="Confirm Password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    {/* Display error message if error is not null */}
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        className="bg-violet-500 text-white w-64 p-2 rounded mt-4"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex flex-col justify-center items-center">
                    <Link to="/" className="text-blue-500 mt-4"> 
                        Already have an account? Sign In
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default SignUp;
