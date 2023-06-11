import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/admin/vista_admin.css';
import { useNavigate } from 'react-router-dom';
import BarraNav from './BarraNav';
import img_zona2 from './../img/300x300.png';
import Footer from './Footer';

function VistaAdminUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [acciones, setAcciones] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5120/usuarios/usuarios', {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:5173',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsuarios(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5120/playlist/playlists', {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:5173',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlaylists(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5120/acciones/acciones', {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:5173',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAcciones(data);
      });
  }, []);

  console.log(acciones);

  return (
    <div className="container">
      <BarraNav />
      <div className="row mt-3">
        <div className="col-12 text-center" id="datos">
          <div className="grafico-container">
            <h4>Gráficas de usuarios</h4>
            <div className="col-8">
              <table className="table">
                <thead>
                  <tr>
                    <th>IdUsuario</th>
                    <th>Nombre de Usuario</th>
                    <th>Email</th>
                    <th>Creado en</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario, index) => (
                    <tr key={index}>
                      <td>{usuario.id}</td>
                      <td>{usuario.nombreUsuario}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-6 text-center" id="datos">
          <div className="playlists-container">
            <h4>Playlist creadas recientemente</h4>
            <div className="row">
              {playlists.map((playlist, index) => (
                <div className="col-6" key={index}>
                  <iframe
                    id={`spotify-iframe-${index}`}
                    src={`https://open.spotify.com/embed/playlist/${playlist.idPlaylist}`}
                    frameBorder="0"
                    width="290"
                    height="370"
                    allowtransparency="true"
                    allow="encrypted-media"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-6 text-center" id="datos">
  <div className="acciones-container">
    <h4>Historial de acciones</h4>
    <div className="row">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>CancionID</th>
              <th>ArtistaID</th>
              <th>DiscoID</th>
              <th>UsuarioID</th>
              <th>Nombre de Usuario</th>
              <th>Ver más</th>
            </tr>
          </thead>
          <tbody>
            {acciones.map((accion, index) => (
              <tr key={index}>
                <td>{accion.cancionID ? accion.cancionID : '-'}</td>
                <td>{accion.artistaID ? accion.artistaID : '-'}</td>
                <td>{accion.discoID ? accion.discoID : '-'}</td>
                <td>{accion.usuarioID ? accion.usuarioID : '-'}</td>
                <td>{accion.nombreUsuario ? accion.nombreUsuario : '-'}</td>
                <td>
  {accion.cancionID ? (
    <a href={`http://localhost:5173/cancion/${accion.cancionID}`} target="_blank" rel="noopener noreferrer">Ver más</a>
  ) : accion.artistaID ? (
    <a href={`http://localhost:5173/artista/${accion.artistaID}`} target="_blank" rel="noopener noreferrer">Ver más</a>
  ) : accion.discoID ? (
    <a href={`http://localhost:5173/disco/${accion.discoID}`} target="_blank" rel="noopener noreferrer">Ver más</a>
  ) : (
    '-'
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
      </div>
      <div className="row mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default VistaAdminUsuario;
