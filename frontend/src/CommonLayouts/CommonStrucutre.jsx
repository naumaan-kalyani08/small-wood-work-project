import { Outlet } from "react-router"
import Footer from "../Components/Footer"
import NavBar from "../Components/NavBar"


const CommonStrucutre = () => {
  return (
    <div className="main-container">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default CommonStrucutre