import { useEffect, useState } from 'react';
import Transition from '../Components/Transition'
import { ReusableInputField } from '../Components/ReusableComponents';
import { GetCommonFunction } from '../CommonUtilities/CommonFunctions';

const AuthPage = () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const [view, setView] = useState('login')

    const [AuthForm, setAuthForm] = useState({
        email: '',
        password: ''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthForm(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleRegisterInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted form data:', `email:${AuthForm.email}`, `password:${AuthForm.password}`);
    }
    const flipCard = (section) => {
        setView(section)
        console.log(`flipping to ${section} section from ${view} section`);
    }
    const AuthUser = async () => {
        try {
            const response = await fetch(`${apiUrl}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(AuthForm)
            })
        } catch (error) {
            console.error(error)
        }
    }
    const [registerFormData, setRegisterFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        dob: '',
        phone_number: ''
    })
    const registerUser = async () => {
        console.log('registering user with data:', registerFormData);
        try {
            const response = await fetch(`${apiUrl}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(registerFormData)
            })
        } catch (error) {
            console.error(error)
            console.log('hitted api endppoint', `${apiUrl}register`)
        }
    }
    // useEffect(() => {
    //     GetCommonFunction('contact-submissions')
    // }, [])
    return (
        <div className='auth-page-main wrapper min-h-screen flex items-center justify-center'>
            <div className="auth-card-wrapper perspective">

                {/* 🔥 ONE rotating container */}
                <div className={`flip-card ${view}`}>

                    {/* FRONT (Login) */}
                    <div className="card card-front bg-white p-4 rounded-lg shadow-lg">
                        <h2 className='text-2xl font-bold  mb-4'>Login</h2>
                        <ReusableInputField value={AuthForm.email} onchange={handleInputChange} label="Email" placeholder="Enter your email" name="email" />
                        <ReusableInputField value={AuthForm.password} onchange={handleInputChange} label="Password" placeholder="Enter your password" type="password" name="password" />

                        <p className="cursor-pointer text-orange-800 font-medium  underline py-1" onClick={() => flipCard('forgot')}>Reset Password</p>
                        <button className="w-full px-4 py-1 shadow-md rounded border text-orange-800 font-semibold border-orange-800 cursor-pointer mb-2" onClick={() => flipCard('signup')}>Sign Up</button>
                        <button className="w-full px-4 py-1.5 shadow-md rounded bg-orange-800 text-white cursor-pointer " onClick={AuthUser}>Login</button>
                    </div>

                    {/* RIGHT (Signup) */}
                    <div className="card card-right bg-white p-4 rounded-lg shadow-lg">
                        <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>

                        <button>Sign Up</button>
                        <button onClick={() => flipCard('login')}>Back</button>
                    </div>

                    {/* LEFT (Forgot) */}
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

                            </>
                            : <h2 className='text-2xl font-bold mb-4'>Forgot Password</h2>
                        }
                        <button className="w-full px-4 py-1 shadow-md rounded border text-orange-800 font-semibold border-orange-800 cursor-pointer mb-2" onClick={() => flipCard('login')}>Back</button>
                        <button className="w-full px-4 py-1.5 shadow-md rounded bg-orange-800 text-white cursor-pointer " onClick={registerUser}>Register</button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Transition(AuthPage)