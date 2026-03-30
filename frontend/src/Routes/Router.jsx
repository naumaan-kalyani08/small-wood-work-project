
import { Route, Routes, useLocation } from 'react-router'
import CommonStrucutre from '../CommonLayouts/CommonStrucutre'
import LandingPage from '../Pages/LandingPage'
import ProductsPage from '../Pages/ProductsPage'
import PageNotFound from '../Pages/PageNotFound'
import { AnimatePresence } from 'framer-motion'
import ContactUsFormResponses from '../Pages/ContactUsFormResponses'
import ManufacturingPage from '../Pages/ManufacturingPage'
import AuthPage from '../Pages/AuthPage'
const Router = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route element={<CommonStrucutre />}>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/products' element={<ProductsPage />} />
                    <Route path='/contact-us-form-responses' element={<ContactUsFormResponses />} />
                    <Route path='/manufacturing' element={<ManufacturingPage />} />
                    <Route path='*' element={<PageNotFound />} />
                </Route>
                {/* without header  */}
                <Route>
                    <Route path='/login' element={<AuthPage />} />
                </Route>
                added route for component where we not want to show common structure
                {/* <Route path='*' element={<PageNotFound />} /> */}
            </Routes>
        </AnimatePresence>
    )
}

export default Router