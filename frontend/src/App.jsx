// commit code clean up 
import SmoothScrollEffect from './Components/SmoothScrollEffect'
import Router from './Routes/Router'
import { AuthProvider } from './context/AuthContext'
import './Style/App.css'
const App = () => {
  return (
    <AuthProvider>
      <SmoothScrollEffect>
        <Router />
      </SmoothScrollEffect>
    </AuthProvider>
  )
}

export default App