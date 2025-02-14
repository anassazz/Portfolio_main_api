import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ParticleBackground from './components/Particle'
import About from './components/About'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Messages from './components/Messages'
import Footer from './components/Footer';
import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <>
      {/*  */}
      <Routes>
        <Route path='/' element={
          <>
          <ParticleBackground />
          <Navbar />
          <Hero />
          <About/>
          <Projects/>
          <Testimonials/>
          <Contact/>
          <Footer/>
          </>
        }></Route>
        <Route path='/messages' element={<Messages></Messages>}></Route>
      </Routes>
    </>
  )
}

export default App
