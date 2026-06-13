import React from 'react'
import Transition from '../Components/Transition'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='flex-box-center'>
            <h1 className='text-4xl font-bold text-center'>404 - Page Not Found</h1>
            <p className='text-center mt-4 text-gray-600'>The page you are looking for does not exist.</p>
            <p className='text-center mt-4 text-gray-600'>Please check the URL or navigate back to the previous page.</p>
            <Link to="/" className='block text-center mt-6 text-blue-500 hover:underline'>Go to Home</Link>
        </div>
    )
}

export default Transition(PageNotFound);