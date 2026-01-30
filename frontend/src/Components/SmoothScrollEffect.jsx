import { useEffect } from 'react'
import Lenis from 'lenis';
const SmoothScrollEffect = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.05,
        })
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
        };
    }, [])
    return (<>
        {children}
    </>)
}

export default SmoothScrollEffect