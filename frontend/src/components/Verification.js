import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const VerifyOtp = () => {
    const [mobileOtp, setMobileOtp] = useState('');
    const [emailOtp, setEmailOtp] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            navigate('/register'); // Redirect to registration if no userId is found
        } else {
            setUserId(storedUserId);
        }
    }, [navigate]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/verify-otp', {
                userId,
                mobileOtp,
                emailOtp,
            });

            setMessage(response.data.message);
            setToken(response.data.token);
            if (response.data.token) {
                navigate('/dashboard'); // Redirect to the dashboard
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Error verifying OTPs");
        }
    };

    // return (
    //     <div>
    //         <h2>Verify Your OTPs</h2>
    //         <form onSubmit={handleVerifyOtp}>
    //             <div>
    //                 <label>Mobile OTP</label>
    //                 <input
    //                     type="text"
    //                     value={mobileOtp}
    //                     onChange={(e) => setMobileOtp(e.target.value)}
    //                     placeholder="Enter Mobile OTP"
    //                     required
    //                 />
    //             </div>
    //             <div>
    //                 <label>Email OTP</label>
    //                 <input
    //                     type="text"
    //                     value={emailOtp}
    //                     onChange={(e) => setEmailOtp(e.target.value)}
    //                     placeholder="Enter Email OTP"
    //                     required
    //                 />
    //             </div>
    //             <button type="submit">Verify OTPs</button>
    //         </form>
    //         {message && <p>{message}</p>}
    //         {token && <p>Token: {token}</p>}
    //     </div>
    // );
    return (
        <div>
            <Navbar /> {/* Add your Navbar component here */}

            <div className='flex flex-col md:flex-row justify-evenly h-screen items-center px-4 md:px-0'>
                <div className='w-full md:w-1/2 p-4'>
                    <p className='text-gray-700 text-lg'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi earum rerum molestiae necessitatibus cum, rem quo ea unde sint assumenda molestias reprehenderit! Explicabo fugit suscipit harum. Aut quaerat autem adipisci nemo numquam ad, placeat voluptates tempora odio provident quisquam quas. Iste perferendis rem ducimus cumque voluptatum laboriosam maxime ipsa ipsam.
                    </p>
                </div>
                <div className='border-2 border-green-500 flex rounded-lg shadow-lg md:w-1/4 w-full'>
                    <form onSubmit={handleVerifyOtp} className='flex flex-col items-start justify-start w-full p-6'>
                        <h2 className="text-2xl mb-1 text-center self-center">Verify Your OTPs</h2>
                        <span className="text-sm mb-2 text-center self-center">Enter the OTPs to verify your account.</span>
                        <div className='flex flex-col space-y-5 w-full'>
                            <input
                                type="text"
                                className='p-3 border-2 border-gray-300 rounded-lg bg-gray-100 w-full'
                                value={mobileOtp}
                                onChange={(e) => setMobileOtp(e.target.value)}
                                placeholder="Enter Mobile OTP"
                                required
                            />
                            <input
                                type="text"
                                className='p-3 border-2 border-gray-300 rounded-lg bg-gray-100 w-full'
                                value={emailOtp}
                                onChange={(e) => setEmailOtp(e.target.value)}
                                placeholder="Enter Email OTP"
                                required
                            />
                            <button type="submit" className='mt-4 bg-green-500 text-white rounded-lg p-2 hover:bg-green-600 transition-colors duration-300'>
                                Verify OTPs
                            </button>
                        </div>
                        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                        {token && <p className="mt-4 text-center text-green-500">Token: {token}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
