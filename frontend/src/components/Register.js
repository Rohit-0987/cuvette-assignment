import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        companyName: '',
        companyEmail: '',
        employeeSize: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', formData);
            const userId = response.data.userId; // Get the userId from response
            localStorage.setItem('userId', userId); // Store userId in localStorage
            navigate('/verify-otp'); // Navigate to OTP verification page
        } catch (error) {
            console.error('Error during registration', error);
        }
    };
    return (
        <div>
            <Navbar />

            <div className='flex flex-col md:flex-row justify-evenly h-screen items-center px-4 md:px-0'>
                <div className='w-full md:w-1/2 p-4'>
                    <p className='text-gray-700 text-lg'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non libero, quod, ducimus officiis dolorem natus porro commodi blanditiis quaerat ipsum ullam repudiandae possimus eos voluptate corporis cupiditate repellendus sed harum! Quas, nihil. Deserunt blanditiis aperiam provident ea, perferendis quibusdam! Ut tempora expedita facere corporis voluptatibus est soluta voluptatem fugit eaque.
                    </p>
                </div>
                <div className=' border-2 border-green-500 flex rounded-lg shadow-lg md:w-1/4 w-full'>
                    <form onSubmit={handleRegister} className='flex flex-col items-start justify-start w-full p-6'>
                        <h2 className="text-2xl mb-1 text-center self-center">Sign Up</h2>
                        <span className="text-sm mb-2 text-center self-center">Lorem ipsum dolor sit.</span>
                        <div className='flex flex-col space-y-5 w-full'>
                            <input type="text" className='p-3 border-2 border-gray-300 rounded-lg bg-gray-100 w-full' name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                            <input type="text" className='p-3 border-2 border-gray-300 rounded-lg bg-gray-100 w-full' name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                            <input type="text" className='p-3 border-2 border-gray-300 rounded-lg bg-gray-100 w-full' name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" />
                            <input type="email" className='p-3 border-2 border-gray-300 rounded-lg bg-gray-100 w-full' name="companyEmail" value={formData.companyEmail} onChange={handleChange} placeholder="Company Email" />
                            <input type="number" className='p-3 border-2 border-gray-300 rounded-lg bg-gray-100 w-full' name="employeeSize" value={formData.employeeSize} onChange={handleChange} placeholder="Employee Size" />
                            <input type="password" className='p-3 border-2 border-gray-300 rounded-lg bg-gray-100 w-full' name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                            <span>
                                Already Registered? <Link to="/login" className='font-semibold'>login</Link>
                            </span>
                            <button type="submit" className='mt-4 bg-green-500 text-white rounded-lg p-2 hover:bg-green-600 transition-colors duration-300'>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
