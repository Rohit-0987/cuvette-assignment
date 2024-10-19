import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Spinner from './Spinner';
const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                email, 
                password
            });
    
            localStorage.setItem('token', res.data.token); // Store JWT token in localStorage
            setLoading(false);
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (err) {
            console.error(err);
            setError('Invalid email or password');
        }
    };
    
    if (loading) {
        return <Spinner />; // Show the spinner while loading
      }
    return (
        <>
            <Navbar/>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Company Login</h1>
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                    <span>Not Registered? <Link to="/register" className='font-semibold'>Register</Link></span>
                </form>
            </div>
        </div>
        </>
    );
};

export default Login;
