import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import './styles/App.css'
import ProtectedRoute from './router/ProtectedRoute';
import HomePage from './pages/Home';
import Calendar from './pages/Calendar';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Login from './pages/Login'
import Error from './pages/404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EventManager from './pages/EventManager'
import PermissionDenied from "./pages/PermissionDenied";

function App() {

  const [user, setUser] = useState(null)

  const Classes = {
    ADMIN: 'admin',
    REGULAR: 'regular',
  }

  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/evenemangshanterare' element={
            <ProtectedRoute isAllowed={!!user && (user.auth.includes(Classes.ADMIN) || user.auth.includes(Classes.REGULAR)) } 
              redirectTo='/behorighet-nekad'>
              <EventManager user={user} />
            </ProtectedRoute>} />

          <Route path='/odu' element={<Page1 />} />
          <Route path='/dfo' element={<Page2 />} />
          <Route path='/odp' element={<Page3 />} />
          <Route path='/nrk' element={<Page4 />} />
          <Route path='/logga-in' element={<Login user={user} setUser={setUser} />} />
          <Route path='/kalendar' element={<Calendar />} />
          <Route path='/behorighet-nekad' element={<PermissionDenied />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer user={user}/>
      </BrowserRouter>
  )
}

export default App;