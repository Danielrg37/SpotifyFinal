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
    fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios`, {
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
    fetch('http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/playlist/playlists', {
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
    fetch('http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/acciones/acciones?limit=10', {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:5173',
      },
    })
      .then((res) => res.json())
     
        .then((data) => {
          console.log(data);
          const firstTenRecords = data.slice(0, 10);
          setAcciones(firstTenRecords);
        });
  }, []);



  const borrar = (id) => {
    fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/Uborrar`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5173',
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Usuario borrado exitosamente');
          // Actualizar la lista de usuarios después de la eliminación
          // setUsuarios(data);
        } else {
          console.log('No se pudo borrar el usuario');
        }
      })
      .catch((error) => {
        console.log('Error al borrar el usuario:', error);
      });
  };


  const editar = (id) => {
    fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/editar/${id}`, {
      method: 'PUT',
      headers: {
        Origin: 'http://localhost:5173',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsuarios(data);
      });
  };

  console.log(acciones);


  return (
    <div className="container">
      <BarraNav />
      <div className="row mt-3">
        <div className="col-12 text-center" id="datos">
          <div className="grafico-container">
            <div className="grafico-container">
              <h4>Tabla de usuarios</h4>
              <div className="col-12">
                <button className="btn btn-outline-success rounded-pill w-100">Crear</button>
                <table className="table table-responsive mt-4">
                  <thead>
                    <tr>
                      <th>IdUsuario</th>
                      <th>Nombre de Usuario</th>
                      <th>Email</th>
                      <th>Creado en</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario, index) => (
                      <tr key={index}>
                        <td>{usuario.id}</td>
                        <td>{usuario.nombreUsuario}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.createdAt}</td>
                        <td>
                          <button className="btn btn-outline-success rounded-pill" onClick={() => borrar(usuario.id)}>
                            Borrar
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-outline-success rounded-pill">Modificar</button>
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
                    style={{ width: '100%', height: '100%', maxWidth: '90vw' }}
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
                        <td>{accion.nombreUsuario ? accion.nombreUsuario : '-'}</td>
                        <td>
                          {accion.cancionID ? (
                            <a href={`http://ec2-3-230-86-196.compute-1.amazonaws.com:5173/cancion/${accion.cancionID}`} target="_blank" rel="noopener noreferrer">Ver más</a>
                          ) : (
                            accion.artistaID ? (
                              <a href={`http://ec2-3-230-86-196.compute-1.amazonaws.com:5173/artista/${accion.artistaID}`} target="_blank" rel="noopener noreferrer">Ver más</a>
                            ) : (
                              accion.discoID ? (
                                <a href={`http://ec2-3-230-86-196.compute-1.amazonaws.com:5173/disco/${accion.discoID}`} target="_blank" rel="noopener noreferrer">Ver más</a>
                              ) : (
                                <span>-</span>
                              )
                            )
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
