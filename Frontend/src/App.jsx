import { useState } from 'react'
import Registro from './pages/Registro'
import Home from './pages/Home'
import Login from './pages/Login'
/* import TopX from './pages/TopX' */
import Perfil from './pages/VistaPerfil'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div id="router">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path = '/registro' element={<Registro />} />
          <Route path = '/login' element={<Login />} />
       {/*    <Route path = '/topx' element={<TopX />} /> */}
          <Route path = '/perfil' element={<Perfil />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
