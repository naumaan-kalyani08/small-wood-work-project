
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import CommonStrucutre from '../CommonLayouts/CommonStrucutre'
import LandingPage from '../Pages/LandingPage'
import ProductsPage from '../Pages/ProductsPage'
import PageNotFound from '../Pages/PageNotFound'
import { AnimatePresence } from 'framer-motion'
import ContactUsFormResponses from '../Pages/ContactUsFormResponses'
import ManufacturingPage from '../Pages/ManufacturingPage'
import AuthPage from '../Pages/AuthPage'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const Router = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route element={<CommonStrucutre />}>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/products' element={<ProductsPage />} />
                    <Route path='/contact-us-form-responses' element={<PrivateRoute><ContactUsFormResponses /></PrivateRoute>} />
                    <Route path='/manufacturing' element={<ManufacturingPage />} />
                    <Route path='*' element={<PageNotFound />} />
                </Route>
                {/* without header  */}
                <Route>
                    <Route path='/login' element={isAuthenticated ? <Navigate to='/' replace /> : <AuthPage />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default Router