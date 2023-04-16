import { useState } from 'react'
import Registro from './pages/Registro'
import Home from './pages/Home'
import Login from './pages/Login'
/* import TopX from './pages/TopX' */
import Perfil from './pages/VistaPerfil'
import VistaCancion from './pages/VistaCancion'
import VistaArtista from './pages/VistaArtista'
import SearchBar from './pages/BarraBusqueda'
import CancionLista from './pages/CancionLista'
import ArtistaLista from './pages/ArtistaLista'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div id="router">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path = '*' element={<Home />} />
          <Route path = '/home' element={<Home />} />
          <Route path = '/registro' element={<Registro />} />
          <Route path = '/login' element={<Login />} />
       {/*    <Route path = '/topx' element={<TopX />} /> */}
          <Route path = '/perfil' element={<Perfil />} />
          <Route path = '/cancion' element={<VistaCancion />} />
          <Route path = '/artista' element={<VistaArtista />} />
          <Route path = '/playlistC' element={<CancionLista />} />
          <Route path = '/playlistA' element={<ArtistaLista />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
