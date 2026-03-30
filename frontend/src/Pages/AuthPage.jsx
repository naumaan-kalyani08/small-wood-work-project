import { useState } from 'react';
import Transition from '../Components/Transition'

const AuthPage = () => {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const [view, setView] = useState('login')
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
                body: JSON.stringify({
                    email: "test@gmail.com",
                    password: "123456"
                })

            })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='auth-page-main wrapper min-h-screen flex items-center justify-center'>
            <div className="auth-card-wrapper perspective">

                {/* 🔥 ONE rotating container */}
                <div className={`flip-card ${view}`}>

                    {/* FRONT (Login) */}
                    <div className="card card-front bg-white p-4 rounded-lg shadow-lg">
                        <h2 className='text-2xl font-bold mb-4'>Login</h2>

                        <button onClick={AuthUser}>Login</button>

                        <span onClick={() => flipCard('signup')}>Sign Up</span>
                        <span onClick={() => flipCard('forgot')}>Reset Password</span>
                    </div>

                    {/* RIGHT (Signup) */}
                    <div className="card card-right bg-white p-4 rounded-lg shadow-lg">
                        <h2>Sign Up</h2>

                        <button>Sign Up</button>
                        <button onClick={() => flipCard('login')}>Back</button>
                    </div>

                    {/* LEFT (Forgot) */}
                    <div className="card card-left bg-white p-4 rounded-lg shadow-lg">
                        <h2>Forgot Password</h2>

                        <button>Reset</button>
                        <button onClick={() => flipCard('login')}>Back</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Transition(AuthPage)