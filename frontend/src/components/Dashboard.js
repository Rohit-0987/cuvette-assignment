import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import useAuth from '../customeHooks/useAuth';

const Dashboard = () => {
    useAuth();
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    // Fetch jobs posted by the company
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('/api/jobs', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setJobs(res.data);
                // Log the company names
            } catch (err) {
                console.error(err);
                if (err.response.status === 401) {
                    navigate('/login'); // Redirect to login if unauthorized
                }
            }
        };
        fetchJobs();
    }, [navigate]);

    // Logout function to clear the token
    const handleLogout = () => {
        // Remove token and other related data
        localStorage.removeItem('token');
        localStorage.clear(); // Optionally clear all local storage items

        // Optionally clear session storage or other storage
        sessionStorage.clear();

        // Navigate to login page
        navigate('/login');

        // Optionally refresh the page to ensure full logout
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* <nav className="bg-white shadow-sm dark:bg-white">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logo.svg" className="h-8" alt="Cuvette Logo" />
                    </a>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-white">
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-700 rounded hover:bg-blue-700 hover:text-white transition duration-300 md:hover:bg-transparent md:hover:text-blue-700">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 text-sm">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
            <Navbar />
            <div className="container mx-auto mt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-3xl font-bold mb-4 md:mb-0">Company Dashboard</h1>
                    <Link to="/add-job" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 text-sm">
                        Post a New Job
                    </Link>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
                    <ul className="space-y-4">
                        {jobs.map(job => (
                            <li key={job._id} className="p-4 bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-lg transition duration-300">
                                <strong className="block text-lg font-medium text-gray-800">Job Title: {job.jobTitle}</strong>
                                <p className="text-gray-600 mt-2"><span className='font-semibold'>Job Description:</span> {job.jobDescription}</p>
                                <p className="text-gray-600 mt-2">
                                    <span className='font-semibold'>Company Name:</span>
                                    {job.company ? job.company.companyName : "N/A"}
                                </p>
                                <p className="text-gray-500 mt-1">Experience Level: {job.experienceLevel}</p>
                                <p className="text-gray-500 mt-1">End Date: {new Date(job.endDate).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

};

export default Dashboard;
