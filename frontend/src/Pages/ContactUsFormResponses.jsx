import { useEffect, useState } from 'react'
import Transition from '../Components/Transition'
import { ReusableTableStructure } from '../Components/ReusableComponents'
import { ContactUscolumns, DummyData } from '../Json/fromResponsesColumns'
import { Skeleton } from 'antd'
import { GetCommonFunction } from '../CommonUtilities/CommonFunctions'

const ContactUsFormResponses = () => {
    const [FormData, setFormData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const apiUrl = import.meta.env.VITE_APP_API_URL

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                setLoading(true)
                setError(null)

                // Call GetCommonFunction and capture the result
                const result = await GetCommonFunction('contact-submissions', {}, false)

                if (!result.success) {
                    throw new Error(result.error)
                }

                // Extract the data - GetCommonFunction returns { data: { data, message } }
                const responseData = result.data
                let submissionsArray = Array.isArray(responseData) ? responseData : responseData.data

                if (!Array.isArray(submissionsArray)) {
                    throw new Error('Invalid response format - expected array or object with data property')
                }

                // Transform data to match table requirements
                const transformedData = submissionsArray.map(item => ({
                    ...item,
                    key: item.id, // Add key property for Ant Design table
                    full_name: `${item.first_name} ${item.last_name}` // Combine names
                }))

                setFormData(transformedData)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching form data:', error)
                setError(error.message)
                setLoading(false)
            }
        }

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