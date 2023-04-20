import { useState } from 'react'
import Registro from './pages/Registro'
import Home from './pages/Home'
import Login from './pages/Login'
/* import TopX from './pages/TopX' */
import Perfil from './pages/VistaPerfil'
import VistaCancion from './pages/VistaCancion'
import VistaArtista from './pages/VistaArtista'
import CancionLista from './pages/CancionLista'
import VistaDisco from './pages/VistaDisco'
import ArtistaLista from './pages/ArtistaLista'
import Admin from './pages/VistaAdmin'
import SpotifyLogin from './pages/SpotifyLogin'

import VistaTotalArtistas from './pages/VistaTotalArtistas'
import VistaTotalCanciones from './pages/VistaTotalCanciones'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div id="router">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path = '/home' element={<Home />} />
          <Route path = '/registro' element={<Registro />} />
          <Route path = '/login' element={<Login />} />
       {/*    <Route path = '/topx' element={<TopX />} /> */}
          <Route path = '/perfil' element={<Perfil />} />
          <Route path = '/cancion' element={<VistaCancion />} />
          <Route path = '/artista' element={<VistaArtista />} />
          <Route path = '/playlistC' element={<CancionLista />} />
          <Route path = '/playlistA' element={<ArtistaLista />} />
          <Route path = '/disco' element={<VistaDisco />} />
          <Route path = '/admin' element={<Admin />} />
          <Route path = '/login2' element={<SpotifyLogin />} />
         <Route path = '/cancion/:id' element={<VistaCancion />} />
          <Route path = '/artista/:id' element={<VistaArtista />} />
          <Route path = '/disco/:id' element={<VistaDisco />} />
          <Route path = '/totalArtistas' element={<VistaTotalArtistas />} />
          <Route path = '/totalCanciones' element={<VistaTotalCanciones />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
