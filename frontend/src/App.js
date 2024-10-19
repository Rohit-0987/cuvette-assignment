import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddJob from './components/AddJob';
import Verification from './components/Verification';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify-otp" element={<Verification />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-job" element={<AddJob />} />
            </Routes>
        </Router>
    );
}

export default App;
