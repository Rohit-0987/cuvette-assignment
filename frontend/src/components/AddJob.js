import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../customeHooks/useAuth';
import Navbar from './Navbar';

const AddJob = () => {
    useAuth()
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        experienceLevel: '',
        candidateEmails: '',
        endDate: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/jobs', jobData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Job posted and emails sent to candidates');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                <div className="mb-4">
                    <label className="block mb-2">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={jobData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Job Description</label>
                    <textarea
                        name="description"
                        value={jobData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Experience Level</label>
                    <input
                        type="text"
                        name="experienceLevel"
                        value={jobData.experienceLevel}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Candidate Emails (comma-separated)</label>
                    <input
                        type="email"
                        name="candidateEmails"
                        value={jobData.candidateEmails}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        multiple
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={jobData.endDate}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit Job and Send Emails
                </button>
            </form>
        </div>
        </>
    );
};

export default AddJob;
