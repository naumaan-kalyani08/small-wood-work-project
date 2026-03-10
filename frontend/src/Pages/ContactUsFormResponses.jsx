import React, { useEffect, useState } from 'react'
import Transition from '../Components/Transition'
import { ReusableTableStructure } from '../Components/ReusableComponents'
import { ContactUscolumns, DummyData } from '../Json/fromResponsesColumns'

const ContactUsFormResponses = () => {
    const [FormData, setFormData] = useState([])
    const apiUrl = import.meta.env.VITE_APP_API_URL

    const fetchFormData = async () => {
        try {
            const response = await fetch(`${apiUrl}contact-submissions`)
            const data = await response.json()
            setFormData(data)
            console.log('Fetched form data:', FormData)
        } catch (error) {
            console.error('Error fetching form data:', error)
        }
    }
    useEffect(() => {
        fetchFormData()
    }, [])
    return (
        <div className='bg-white my-2 p-4 rounded-lg shadow-md container mx-auto'>
            ContactUsFormResponses
            {apiUrl}
            {FormData}
            <ReusableTableStructure dataSource={DummyData} columns={ContactUscolumns} rowKey="key" />
        </div>
    )
}

export default Transition(ContactUsFormResponses)