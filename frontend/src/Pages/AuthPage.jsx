import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import Transition from '../Components/Transition';
import { ReusableInputField } from '../Components/ReusableComponents';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const navigate = useNavigate();
    const { login, register, isAuthenticated } = useAuth();
    const [view, setView] = useState('login');
    const [isLoading, setIsLoading] = useState(false);

    const [AuthForm, setAuthForm] = useState({
        email: '',
        password: ''
    });

    const [registerFormData, setRegisterFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        dob: '',
        phone_number: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegisterInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const flipCard = (section) => {
        setView(section);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const AuthUser = async () => {
        if (!AuthForm.email || !AuthForm.password) {
            return message.error('Please enter both email and password.');
        }

        setIsLoading(true);
        const result = await login(AuthForm);
        setIsLoading(false);

        if (!result.success) return;

        navigate('/');
    };

    const registerUser = async () => {
        if (!registerFormData.first_name || !registerFormData.last_name || !registerFormData.email || !registerFormData.password) {
            return message.error('Please fill out all required fields.');
        }

        if (registerFormData.password !== registerFormData.password_confirmation) {
            return message.error('Passwords do not match.');
        }

        setIsLoading(true);
        const result = await register(registerFormData);
        setIsLoading(false);

        if (!result.success) return;

        navigate('/');
    };

    return (
        <div className='auth-page-main wrapper min-h-screen flex items-center justify-center'>
            <div className="auth-card-wrapper perspective">
                <div className={`flip-card ${view}`}>
                    <div className="card card-front bg-white p-4 rounded-lg shadow-lg">
                        <h2 className='text-2xl font-bold mb-4'>Login</h2>
                        <ReusableInputField value={AuthForm.email} onchange={handleInputChange} label="Email" placeholder="Enter your email" name="email" />
                        <ReusableInputField value={AuthForm.password} onchange={handleInputChange} label="Password" placeholder="Enter your password" type="password" name="password" />

                        <p className="cursor-pointer text-orange-800 font-medium underline py-1" onClick={() => flipCard('forgot')}>Reset Password</p>
                        <button className="w-full px-4 py-1 shadow-md rounded border text-orange-800 font-semibold border-orange-800 cursor-pointer mb-2" onClick={() => flipCard('signup')}>Sign Up</button>
                        <button className="w-full px-4 py-1.5 shadow-md rounded bg-orange-800 text-white cursor-pointer" onClick={AuthUser} disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Login'}
                        </button>
                    </div>

                    <div className="card card-right bg-white p-4 rounded-lg shadow-lg">
                        <h2 className='text-2xl font-bold mb-4'>Create an Account</h2>
                        <p className='text-sm text-gray-600 mb-4'>Sign up to manage your account and view secure submissions.</p>
                        <button className="w-full px-4 py-1 shadow-md rounded bg-orange-800 text-white cursor-pointer" onClick={() => flipCard('signup')}>Start Sign Up</button>
                        <button className="w-full px-4 py-1 shadow-md rounded border border-orange-800 text-orange-800 mt-3" onClick={() => flipCard('login')}>Back to Login</button>
                    </div>

                    <div className="card card-left bg-white p-4 rounded-lg shadow-lg">
                        {view === 'signup' ?
                            <>
                                <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>
                                <ReusableInputField value={registerFormData.first_name} onchange={handleRegisterInputChange} label="First Name" placeholder="Enter your first name" name="first_name" />
                                <ReusableInputField value={registerFormData.last_name} onchange={handleRegisterInputChange} label="Last Name" placeholder="Enter your last name" name="last_name" />
                                <ReusableInputField value={registerFormData.email} onchange={handleRegisterInputChange} label="Email" placeholder="Enter your email" name="email" />
                                <ReusableInputField value={registerFormData.dob} onchange={handleRegisterInputChange} label="Date of Birth" placeholder="Enter your date of birth" type="date" name="dob" />
                                <ReusableInputField value={registerFormData.phone_number} onchange={handleRegisterInputChange} label="Phone Number" placeholder="Enter your phone number" name="phone_number" />
                                <ReusableInputField value={registerFormData.password} onchange={handleRegisterInputChange} label="Password" placeholder="Enter your password" type="password" name="password" />
                                <ReusableInputField value={registerFormData.password_confirmation} onchange={handleRegisterInputChange} label="Confirm Password" placeholder="Confirm your password" type="password" name="password_confirmation" />
                            </>
                            : <h2 className='text-2xl font-bold mb-4'>Forgot Password</h2>
                        }
                        <button className="w-full px-4 py-1 shadow-md rounded border text-orange-800 font-semibold border-orange-800 cursor-pointer mb-2" onClick={() => flipCard('login')}>Back</button>
                        {view === 'signup' && (
                            <button className="w-full px-4 py-1.5 shadow-md rounded bg-orange-800 text-white cursor-pointer" onClick={registerUser} disabled={isLoading}>
                                {isLoading ? 'Processing...' : 'Register'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transition(AuthPage)