// libs
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

// components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

//styles
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App