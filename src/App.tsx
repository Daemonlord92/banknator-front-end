import './App.css'
import {Home} from './static/Home.tsx';
import {Route, Routes} from "react-router-dom";
import {Navbar} from "./nav/Navbar.tsx";
import {Footer} from "./static/Footer.tsx";

function App() {

  return (
      <div className="mx-auto max-w-full">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
          <Footer/>
      </div>
  )
}

export default App
