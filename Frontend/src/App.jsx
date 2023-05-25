import { useState } from 'react'
import Registro from './pages/Registro'
import Home from './pages/Home'
import Login from './pages/Login'
/* import TopX from './pages/TopX' */
import Perfil from './pages/VistaPerfil'
import VistaCancion from './pages/VistaCancion'
import VistaArtista from './pages/VistaArtista'
import VistaDisco from './pages/VistaDisco'
import Admin from './pages/VistaAdmin'
import SpotifyLogin from './pages/SpotifyLogin'
import BarraBusqueda from './pages/BarraBusquedaCancion'
import GalleryComponent from './pages/VistaGaleria'
import VistaAdminArtista from './pages/VistaAdminArtista'
import VistaAdminCancion from './pages/VistaAdminCancion'
import Loader from './pages/Loader'
import BarraNav from './pages/BarraNav'
import VistaAdminUsuario from './pages/VistaAdminUsuario'
import VistaMenu from './pages/VistaMenu'




import VistaMenuPlaylist from './pages/VistaMenuPlaylist'
import VistaTotalArtistas from './pages/VistaTotalArtistas'
import VistaTotalCanciones from './pages/VistaTotalCanciones'
import VistaCancionP from './pages/VistaCancionPlaylist'
import VistaArtistaP from './pages/VistaArtistaPlaylist'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CommentSection from './pages/ComentariosCaja'

function App() {
  return (
    <div id="router">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/login' element={<Login />} />
          {/*    <Route path = '/topx' element={<TopX />} /> */}
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/cancion' element={<VistaCancion />} />
          <Route path='/artista' element={<VistaArtista />} />
          <Route path='/playlistC' element={<VistaCancionP />} />
          <Route path='/playlistA' element={<VistaArtistaP />} />
          <Route path='/disco' element={<VistaDisco />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/login2' element={<SpotifyLogin />} />
          <Route path='/cancion/:id' element={<VistaCancion />} />
          <Route path='/artista/:id' element={<VistaArtista />} />
          <Route path='/disco/:id' element={<VistaDisco />} />
          <Route path='/totalArtistas' element={<VistaTotalArtistas />} />
          <Route path='/totalCanciones' element={<VistaTotalCanciones />} />
          <Route path='/search' element={<BarraBusqueda />} />
          <Route path='/galeria' element={<GalleryComponent />} />
          <Route path='/galeria/:id' element={<GalleryComponent />} />
          <Route path='/adminArtista' element={<VistaAdminArtista />} />
          <Route path='/adminCancion' element={<VistaAdminCancion />} />
          <Route path='/adminUsuario' element={<VistaAdminUsuario />} />
          <Route path='/adminMenu2' element={<VistaMenu />} />
          <Route path='/menuPlaylist' element={<VistaMenuPlaylist />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
