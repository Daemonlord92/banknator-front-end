import './App.css'
import {Home} from './static/Home.tsx';
import {Route, Routes} from "react-router-dom";
import {Navbar} from "./nav/Navbar.tsx";
import {Footer} from "./static/Footer.tsx";
import {About} from "./static/About.tsx";
import {Services} from "./static/Services.tsx";
import {Login} from "./auth/login/Login.tsx";
import {Register} from "./auth/register/Register.tsx";
import {ProtectedRoute} from "./auth/protectedRoute.tsx";
import {DashboardSelector} from "./shared/DashboardSelector.tsx";

function App() {

  return (
      <div className="mx-auto max-w-full">
          <Navbar/>
          <div className="my-20">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about-us" element={<About/>} />
                <Route path="/services" element={<Services/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                  <Route path={"/dashboard"} element={<ProtectedRoute>
                      <DashboardSelector/>
                  </ProtectedRoute>}/>
              </Routes>
          </div>
          <Footer/>
      </div>
  )
}

export default App
