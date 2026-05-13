import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Transition from '../Components/Transition'
import { ReusableTableStructure } from '../Components/ReusableComponents'
import { ContactUscolumns, DummyData } from '../Json/fromResponsesColumns'
import { Skeleton } from 'antd'
import { apiRequest } from '../CommonUtilities/CommonFunctions'
import { useAuth } from '../context/AuthContext'

const ContactUsFormResponses = () => {
    const [FormData, setFormData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { token, authHeaders } = useAuth()

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        const fetchFormData = async () => {
            try {
                setLoading(true)
                setError(null)

                const result = await apiRequest({
                    endpoint: '/contact-submissions',
                    method: 'GET',
                    headers: authHeaders,
                    showMessage: false,
                })

                if (!result.success) {
                    throw new Error(result.error || 'Unable to fetch submissions.')
                }

                const responseData = result.data?.data || []

                if (!Array.isArray(responseData)) {
                    throw new Error('Invalid response format - expected array')
                }

                const transformedData = responseData.map(item => ({
                    ...item,
                    key: item.id,
                    full_name: `${item.first_name} ${item.last_name}`.trim(),
                }))

                setFormData(transformedData)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching form data:', error)
                setError(error.message || 'Failed to load responses.')
                setLoading(false)
            }
        }

        fetchFormData()
    }, [token, authHeaders])

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