import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home/home.css';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';





function BarraNav() {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState(null);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);


    useEffect(() => {
        if (token) {
            fetch(`http://localhost:5120/Perfil`,
                {
                    method: "GET", headers:
                    {
                        'X-Access-Token': localStorage.getItem('token'),
                        'Origin': 'http://localhost:5173'  // Replace with your front-end application's URL and port
                    }
                }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUserData(data);
                    // Revisa la respuesta completa del endpoint setTopArtistas(data.items); // Extrayendo los artistas de la respuesta
                });
        }
    }, [token]);



    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                Placeholder
            </a>
            <ul className="nav nav-pills">

                <div className="dropdown" onMouseLeave={handleDropdownClose}>
                    <img src={userData?.images?.[0]?.url}
                        alt="Your Image"
                        className="dropdown-img"
                        style={{ width: '62px', height: '62px', borderRadius: '50%', marginRight: '2em' }}
                        onMouseEnter={handleDropdownToggle}
                    />
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            <a href="#" onClick={() => navigate('perfil')}>Perfil</a>
                            <a href="#" onClick={() => navigate('login2')}>Login con Spotify</a>
                           <a href="#" onClick={() => navigate('admin')}>Admin *tmp*</a>
                        </div>
                    )}
                </div>
            </ul>
        </header>
    );
}

export default BarraNav;
