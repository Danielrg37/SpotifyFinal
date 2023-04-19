import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';
import fernando from './../img/fernando.png';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';

function Home() {
    const [token, setToken] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
    
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
    
        setToken(token)
    
    }, [])


    return (
        <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    Placeholder
                </a>

                <ul class="nav nav-pills">
                    <Button className="green-color"  onClick={() => navigate('/registro')}>
                        
                        Placeholder
                    </Button>
                </ul>
            </header>
            <div class="p-5 mb-4 rounded-3" id="containers_info">
                <div class="container-fluid py-5">
                    <div class="row">
                        <div class="col-md-8 text-center">
                            <h1 class="display-5 fw-bold">Fernando Alonso</h1>
                            <p class="fs-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro pariatur, excepturi nulla, fugit ducimus in voluptatem est ipsum rem aliquam minima accusantium a assumenda similique vitae quibusdam laudantium reprehenderit totam!</p>
                            <Button className="green-color" style={{ width: '40rem', height: '4rem' }} onClick={() => navigate('/login')}>
                                Placeholder
                            </Button>
                        </div>

                        <div class="col-md-4 d-flex align-items-center justify-content-center">

                        <img src="https://picsum.photos/500/500" class="img-fluid rounded-start" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-5 mb-4 rounded-3" id="containers_info">
                <div class="container-fluid py-5">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="https://picsum.photos/500/500" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-6">
                            <h1>Placeholder 1</h1>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis alias incidunt nam ex, molestiae deleniti libero totam perferendis aspernatur laudantium delectus porro neque aut, dicta recusandae dolorem in eos id.</p>
                            <h1 className='mt-5'>Placeholder 2</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, quos voluptas qui assumenda soluta facilis minus distinctio excepturi ut sit saepe, blanditiis, eaque quidem deserunt itaque consectetur quae necessitatibus perspiciatis.</p>
                            <h1 className='mt-5'>Placeholder 3</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, esse, magnam ab perferendis voluptate cum minus eum similique quam beatae qui. Maxime reprehenderit accusamus esse rerum provident ad autem quisquam!</p>

                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p class="float-end"><a href="#">Back to top</a></p>
                <p>Placeholder <a href="#">Placeholder</a> · <a href="#"></a></p>

            </footer>
        </div>
    );
}



export default Home;


