// commit code clean up 
import SmoothScrollEffect from './Components/SmoothScrollEffect'
import Router from './Routes/Router'
import './Style/App.css'
const App = () => {
  return (
    <SmoothScrollEffect>
      <Router />
    </SmoothScrollEffect>
  )
}

export default App