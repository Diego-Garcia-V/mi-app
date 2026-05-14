import React from 'react';
import {Link } from 'react-router-dom';

function Menu(props) {
    return(
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="Menu">Menú desplegable </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link to='/' className='btn btn-primary m-2'>Inicio</Link>
                        <tr/>
                        <Link to='/RegistrarIncidencias' className='btn btn-primary m-2'>Registrar Incidencia</Link>
                        <tr/>
                        <Link to='/VerIncidencias' className='btn btn-primary m-2'>Ver Incidencias</Link>
                        <tr/>
                        <Link to='/RegistrarUsuarios' className='btn btn-primary m-2'>Registrar Usuarios</Link>
                        <tr/>
                        <Link to='/VerUsuarios' className='btn btn-primary m-2'>Ver Usuarios</Link>
                        <tr/>
                    </div>
                </div>
            </nav>  
            
        </div>
    ) 
}export default Menu;