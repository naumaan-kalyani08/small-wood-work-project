
import { Route, Routes, useLocation } from 'react-router'
import CommonStrucutre from '../CommonLayouts/CommonStrucutre'
import LandingPage from '../Pages/LandingPage'
import ProductsPage from '../Pages/ProductsPage'
import PageNotFound from '../Pages/PageNotFound'
import { AnimatePresence } from 'framer-motion'
const Router = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route element={<CommonStrucutre />}>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/products' element={<ProductsPage />} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </AnimatePresence>
    )
}

export default Router