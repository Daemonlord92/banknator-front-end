import './App.css'
import {Home} from './static/Home.tsx';
import {Route, Routes} from "react-router-dom";
import {Navbar} from "./nav/Navbar.tsx";
import {Footer} from "./static/Footer.tsx";
import {About} from "./static/About.tsx";
import {Services} from "./static/Services.tsx";

function App() {

  return (
      <div className="mx-auto max-w-full">
          <Navbar/>
          <div className="my-20">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about-us" element={<About/>} />
                <Route path="/services" element={<Services/>}/>
              </Routes>
          </div>
          <Footer/>
      </div>
  )
}

export default App
