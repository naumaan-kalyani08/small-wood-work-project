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
                },
                body: JSON.stringify(AuthForm)
            })
        } catch (error) {
            console.error(error)
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
                                <ReusableInputField value={AuthForm.first_name} onchange={handleInputChange} label="First Name" placeholder="Enter your first name" name="first_name" />
                                <ReusableInputField value={AuthForm.last_name} onchange={handleInputChange} label="Last Name" placeholder="Enter your last name" name="last_name" />
                                <ReusableInputField value={AuthForm.email} onchange={handleInputChange} label="Email" placeholder="Enter your email" name="email" />
                                <ReusableInputField value={AuthForm.password} onchange={handleInputChange} label="Password" placeholder="Enter your password" type="password" name="password" />

                            </>
                            : <h2 className='text-2xl font-bold mb-4'>Forgot Password</h2>
                        }
                        <button className="w-full px-4 py-1 shadow-md rounded border text-orange-800 font-semibold border-orange-800 cursor-pointer mb-2" onClick={() => flipCard('login')}>Back</button>
                        <button className="w-full px-4 py-1.5 shadow-md rounded bg-orange-800 text-white cursor-pointer " >Reset</button>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Transition(AuthPage)