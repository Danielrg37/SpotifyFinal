import { useState, useEffect } from 'react';
import { Card, Image, Button, Form } from 'react-bootstrap';
import React from 'react';
import ben from "./../img/ben.png";
import fernando from "./../img/fernando.png";
import "./css/comentarios/comentarios.css";
import axios from 'axios';

const CommentSection = (props) => {
  const { idPagina } = props;
  const [respuesta, setRespuesta] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [user_id, setUser_id] = useState('');

  const ManejarRespuesta = (event) => {
    setRespuesta(event.target.value);
  };

  useEffect(() => {
    fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/usuarios/usuarios`, {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:5173',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const usuarioLogueado = data.find(usuario => usuario.nombreUsuario === localStorage.getItem('nombreUsuario'));
        setUser_id(usuarioLogueado.id);
      });
  }, []);

  const AñadirRespuesta = (event) => {
    event.preventDefault();
    // Create a new comment object
    console.log(idPagina, user_id, new Date().toISOString(), respuesta);
    // Send the new comment to the backend
    fetch('http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/comentarios/crearComentarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173'
      },
      body: JSON.stringify({
        IDPagina: idPagina,
        UsuarioID: user_id,
        FechaCreacion: new Date().toISOString(),
        Texto: respuesta
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRespuesta('');
        setMostrarForm(false);
        location.reload();
      });
  };


  const BotonResponder = () => {
    setMostrarForm(true);
  };

  useEffect(() => {
    fetch(`http://ec2-3-230-86-196.compute-1.amazonaws.com:5120/comentarios/comentarios`, {
      method: 'GET',
      headers: {
        Origin: 'http://localhost:5173',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComentarios(data);
      });
  }, [idPagina]);
  
  


  

  return (
    <div className='comentarios-container'>
      <div className="d-flex justify-content-center">
        <button className='btn btn-success rounded-pill w-100 mt-2 mb-2' onClick={BotonResponder}>
          Nuevo comentario
        </button>
      </div>
      <Card className='comentarios-container'>
        <Card.Body>
          {/* Nested comment */}
          {comentarios
          .filter((comentario) => comentario.idPagina === idPagina)
          .map((comentario, index) => (
  <div className="d-flex flex-start mt-4 comentarios-container" key={index}>
    <Image
      className="rounded-circle shadow-1-strong me-3"
      src={fernando}
      alt="avatar"
      width="65"
      height="65"
    />

    <div className="flex-grow-1 flex-shrink-1">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-1" style={{ color: 'black' }}>
            {comentario.usuarioID} - {comentario.fecha}
          </p>
        </div>
        <p className="small mb-0" style={{ color: 'black' }}>
          {comentario.texto}
        </p>
      </div>
    </div>
  </div>
))}

          {/* End of nested comment */}

          {/* Reply form */}
          {mostrarForm && (
            <Form onSubmit={AñadirRespuesta}>
              <Form.Group className="mt-4">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Escribe aquí tu respuesta"
                  value={respuesta}
                  onChange={ManejarRespuesta}
                />
              </Form.Group>
              <Button className='btn btn-success rounded-pill w-43 mt-2 mb-2' type="submit">
                Responder
              </Button>
            </Form>
          )}
          {/* End of reply form */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CommentSection;
