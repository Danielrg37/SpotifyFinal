import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/admin/vista_admin.css';
import { useNavigate } from 'react-router-dom';
import BarraNav from './BarraNav';
import img_zona2 from './../img/300x300.png';
import Footer from './Footer';
import { Modal } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import Error404 from './Error404';
import Loader from './Loader';



function VistaAdminUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [acciones, setAcciones] = useState([]);

  const [usuarioTipo, setUsuarioTipo] = useState("");

  useEffect(() => {
      if (localStorage.getItem('nombreUsuario')) {
        fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:5173",
          }
        })
        .then(response => response.json())
        .then(data => {
          const usuario = data.find(user => user.nombreUsuario === localStorage.getItem('nombreUsuario'));
          if (usuario) {
            setUsuarioTipo(usuario.tipo);
            console.log(usuarioTipo);
          }
        })
        .catch(error => console.error(error));
      }
    }, []);

    if (usuarioTipo === "user") {
      return <Error404 />;
    } else if (usuarioTipo === "") {
      return <Loader />;
    }


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
        const firstTenRecords = data.slice(0, 10);
        setPlaylists(firstTenRecords);
      });
  }, []);

  useEffect(() => {
    fetch('http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/acciones/acciones', {
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


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showModal, setShowModal] = useState(false);
  const [usuarioNombre, setNombreUsuario] = useState('');
  const [usuarioContraseña, setContraseña] = useState('');
  const [email, setEmail] = useState('');

  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  const [showModal2, setShowModal2] = useState(false);


  const nuevoUsuario = () => {
    fetch('http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:5173',
      },
      body: JSON.stringify({
        nombreUsuario: usuarioNombre,
        contraseña: usuarioContraseña,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

      });
    location.reload(); // Recargar la página actual
  };




const [usuarioAux, setUsuarioAux] = useState('');


  const guardarUsuarioModificado  = () => {
    

    

    fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios/editar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173',
      },
      body: JSON.stringify({
        id: usuarioAux,
        nombreUsuario: usuarioNombre,
        contraseña: usuarioContraseña,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleCloseModal2();
      })
      .catch((error) => {
        console.log('Error al modificar el usuario:', error);
      });
  };









  return (


    <div className="container">
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Crear usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Nombre"
            aria-label="Nombre"
            type="input"
            value={usuarioNombre}
            onChange={event => setNombreUsuario(event.target.value)}
          />
          <FormControl
            placeholder="Contraseña"
            aria-label="Contraseña"
            type="input"
            className='mt-3'
            value={usuarioContraseña}
            onChange={event => setContraseña(event.target.value)}
          />
          <FormControl
            placeholder="Email"
            aria-label="Email"
            type="input"
            className='mt-3'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

        </Modal.Body>
        <Modal.Footer>
          <button className='color-verde' onClick={nuevoUsuario}>
            Crear
          </button>
          <button className='color-verde' onClick={handleCloseModal}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal2} onHide={handleCloseModal2}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Modificar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Nombre"
            aria-label="Nombre"
            type="input"
            value={usuarioNombre}
            onChange={event => setNombreUsuario(event.target.value)}
          />
          <FormControl
            placeholder="Contraseña"
            aria-label="Contraseña"
            type="input"
            className='mt-3'
            value={usuarioContraseña}
            onChange={event => setContraseña(event.target.value)}
          />
          <FormControl
            placeholder="Email"
            aria-label="Email"
            type="input"
            className='mt-3'
            value={email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            onChange={event => setEmail(event.target.value)}
          />

        </Modal.Body>
        <Modal.Footer>
          <button className='color-verde' onClick={guardarUsuarioModificado}>
            Modificar usuario
          </button>
          <button className='color-verde' onClick={handleCloseModal2}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>


      <BarraNav />
      <div className="row mt-3">
        <div className="col-12 text-center" id="datos">
          <div className="grafico-container">
            <div className="grafico-container">
              <h4>Tabla de usuarios</h4>
              <div className="col-12">
                <button className="btn btn-outline-success rounded-pill w-100" onClick={() => handleShowModal()}>Crear</button>
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
                          <button
                            className="btn btn-outline-success rounded-pill"
                            onClick={() => {
                              handleShowModal2();
                              setUsuarioAux(usuario.id);
                            }}
                          >
                            Modificar
                          </button>


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
