import AboutUs from "./components/AboutUs"
import Contact from "./components/Contact"
import Fleet from "./components/Fleet"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Location from "./components/Location"
import Navbar from "./components/Navbar"

const LandingPage = () => {

  
  
  return (
    <div>
       <Navbar />
        <Home />
        <AboutUs />
        <Location />
        <Fleet />
        <Contact />
        <Footer />
    </div>
  )
}

export default LandingPage
