import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

    if (loading) return <div className='relative overflow-hidden min-h-screen bg-gradient-to-b from-white via-amber-50/40 to-white py-12'><div className='absolute top-0 left-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl' /><div className='absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl' /><div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-[2rem] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl'><Skeleton active paragraph={{ rows: 6 }} /></div></div>
    if (error) return <div className='relative overflow-hidden min-h-screen bg-gradient-to-b from-white via-amber-50/40 to-white py-12'><div className='absolute top-0 left-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl' /><div className='absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl' /><div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-[2rem] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl text-red-600'><p className='text-lg font-semibold'>Error: {error}</p></div></div>

    return (
        <div className='relative overflow-hidden min-h-screen bg-gradient-to-b from-white via-amber-50/40 to-white py-12'>
            <div className='absolute top-0 left-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl' />
            <div className='absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl' />
            <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='rounded-[2rem] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl'>
                    <h1 className='text-3xl font-black text-gray-900 mb-6'>Contact Form Responses</h1>
                    <ReusableTableStructure dataSource={FormData.length > 0 ? FormData : DummyData} columns={ContactUscolumns} rowKey="key" />
                </div>
            </div>
        </div>
    )
}

export default Transition(ContactUsFormResponses)