import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  const phrases = [
    "Oops, parece que esta página ha sido 'Sumergida en el Paraíso' de Lana Del Rey. ¡Pero no te preocupes, estamos trabajando en ello!",
    "Lo sentimos, pero aquí no hay 'Monstruos Raros'. La página que buscas está en una dimensión alternativa.",
    "¡Ay, ay, ay! Esta página ha sido 'Secuestrada por el Amor' de Lana Del Rey. Esperemos que pronto regrese.",
    "Oh, oh, parece que estamos 'Just Dance' ando alrededor de esta página perdida. ¡No te preocupes, volveremos a encontrarnos!",
    "Lo sentimos, pero esta página ha sido 'Born This Way' para no ser encontrada. ¡Pero tú puedes seguir navegando!",
    "Ups, parece que estás 'Conducida por la Ira' en una dirección equivocada. Esta página no existe.",
    "Lo siento, pero aquí no hay 'Malas Noticias'. La página que buscas no se encuentra.",
    "Oops, esta página ha desaparecido como 'Bad Guy' de Billie Eilish. ¡No te preocupes, puedes volver atrás!",
    "Lo sentimos, parece que te encuentras en una 'Pesadilla'. Esta página no está en tus sueños.",
    "¡Ay, ay, ay! Esta página está 'Out of the Woods'. Probablemente Taylor Swift ya la encontró.",
    "Oh, oh, nos hemos encontrado con una 'Historia Cruel'. Pero no es tan triste, solo es un error 404."
  ];

  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ fontSize: '4em', marginBottom: '0.5em' }}>ERROR 404</h1>
      <h1 style={{ fontSize: '8em', transform: 'rotate(90deg)', marginBottom: '0.2em' }}>
        <>:(</>
      </h1>
      <h2 style={{ fontSize: '1.5em', marginTop: '0.5em' }}>Página no encontrada</h2>
      <p style={{ fontSize: '1.5em', marginTop: '0.5em', textAlign: 'center' }}>{randomPhrase}</p>
      <Link to="/home">
        <button className="btn btn-outline-success rounded-pill w-100" style={{ fontSize: '2em', marginTop: '0.5em', textAlign: 'center' }}>Volver al inicio</button>
      </Link>
    </div>
  );
}

export default Error404;
