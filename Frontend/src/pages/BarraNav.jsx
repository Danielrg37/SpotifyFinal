import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home/home.css';
import fernando from './../img/fernando.png';
import { useNavigate } from 'react-router-dom';
import imagenBack from './../img/foto2.png';

function BarraNav() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        Placeholder
      </a>
      <ul className="nav nav-pills">
        <Button className="green-color" onClick={() => navigate('login2')}>
          Placeholder
        </Button>

        <Button className="green-color" onClick={() => navigate('perfil')}>
          Perfil rápido
        </Button>

        <Button className="green-color" onClick={() => navigate('admin')}>
          Admin rápido
        </Button>

        <div className="dropdown" onMouseLeave={handleDropdownClose}>
          <img
            src="your-image.jpg"
            alt="Your Image"
            className="dropdown-img"
            onMouseEnter={handleDropdownToggle}
          />
          {isDropdownOpen && (
            <div className="dropdown-content">
              <a href="#">Option 1</a>
              <a href="#">Option 2</a>
              <a href="#">Option 3</a>
            </div>
          )}
        </div>
      </ul>
    </header>
  );
}

export default BarraNav;
