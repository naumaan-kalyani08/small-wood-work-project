import { useEffect, useState } from 'react'
import Transition from '../Components/Transition'
import { ReusableTableStructure } from '../Components/ReusableComponents'
import { ContactUscolumns, DummyData } from '../Json/fromResponsesColumns'
import { Skeleton } from 'antd'

const ContactUsFormResponses = () => {
    const [FormData, setFormData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const apiUrl = import.meta.env.VITE_APP_API_URL

    const fetchFormData = async () => {
        try {
            setLoading(true)
            setError(null)
            const endpoint = `${apiUrl}contact-submissions`
            console.log('Fetching from:', endpoint)

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies if needed
            })

            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            setFormData(data)
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        } catch (error) {
            console.error('Error fetching form data:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFormData()
    }, [])

    if (loading) return <div className='bg-white my-2 p-4 rounded-lg shadow-md container mx-auto'><Skeleton active paragraph={{ rows: 6 }} /></div>
    if (error) return <div className='bg-red-100 my-2 p-4 rounded-lg shadow-md container mx-auto text-red-700'>Error: {error}</div>

    return (
        <div className='bg-white min-height-screen my-2 p-4 rounded-lg shadow-md container mx-auto'>
            <h1>Contact Form Responses</h1>

            <ReusableTableStructure dataSource={FormData.length > 0 ? FormData : DummyData} columns={ContactUscolumns} rowKey="key" />
        </div>
    )
}

export default Transition(ContactUsFormResponses)