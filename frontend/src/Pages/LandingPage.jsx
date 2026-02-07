import Hero from '../Components/Hero'
import Products from '../Components/Products'
import Manufacturing from '../Components/Manufacturing'
import Contact from '../Components/Contact'
import Transition from '../Components/Transition'

const LandingPage = () => {
    return (
        <>
            <Hero />
            <Products />
            <Manufacturing />
            <Contact />
        </>
    )
}

export default Transition(LandingPage);