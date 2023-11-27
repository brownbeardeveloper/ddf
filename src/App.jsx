import React, {useState, useEffect } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './styles/App.css'
import Home from './pages/Home';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import Error from './pages/404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");

  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
  }, [isAuth]);

  return (
      <HashRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/page1' element={<Page1 />} />
            <Route path='/page2' element={<Page2 />} />
            <Route path='/page3' element={<Page3 />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
            <Route path='/create-event' element={<CreateEvent />} />
            <Route path='*' element={<Error />} />
          </Routes>
        <Footer/>
      </HashRouter>
  )
}

export default App;