import Header from '../header/Header';
import Footer from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import Fondo from "../img/instituto.png";
import Menu from '../components/Menu';
import Login from '../components/Login';
import { Routes, Route } from 'react-router-dom';
import Inicio from '../components/Inicio';
import RegistrarIncidencias from '../components/RegistrarIncidencias';
import VerIncidencias from '../components/VerIncidencias';
import RegistrarUsuarios from '../components/RegistrarUsuarios';
import VerUsuarios from '../components/VerUsuarios';

function App() {
    //Definicion de la URL de la API para el login
    const LOGIN_API_URL = 'http://localhost:3004/login';


    //Definicion de la variable para usuario logueado
    const [usuarioLogueado, setUsuarioLogueado] = useState();

    //Funcion que se ejecuta al loguearse
    const onLogin = async (email, password) => {
        try {
            let response = await fetch(LOGIN_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if(response.ok){
                let data = await response.json();
                localStorage.setItem("usuarioLogueado", JSON.stringify(data.user));
                setUsuarioLogueado(data.user);
                console.log("Usuario logueado: ", data);
                return true;
            }else{
                const error = await response.json();
                alert(`Credenciales incorrectas. Error: ${response.status} - ${error.message}`);
                return false;
            }
            
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            return false;
        }
    }

    //Hook de comprobacion para el login
    useEffect(()=>{
        if(localStorage.getItem("users")){
            setUsuarioLogueado(JSON.parse(localStorage.getItem("users")));
        }
    },[]);

    return (
        <div id="App" className='card' style={
            {
                backgroundImage: `url(${Fondo})`,
                backgroundSize: "contain",
                backgroundRepeat: 'repeat',
                backgroundBlendMode: 'luminosity'
            }
        }>
            <Header />
            <div className='App'>
                {!usuarioLogueado ? <Login onLogin={onLogin} /> :
                <div>
                    <h2 className='card-title mb-1 text-center bg-light'> Mi aplicación</h2>
                    <Menu/>
                    <Routes>
                        <Route path='/' element={<Inicio />} />
                        <Route path='/RegistrarIncidencias' element={<RegistrarIncidencias />} />
                        <Route path='/VerIncidencias' element={<VerIncidencias />} />
                        <Route path='/RegistrarUsuarios' element={<RegistrarUsuarios />} />
                        <Route path='/VerUsuarios' element={<VerUsuarios />} />
                    </Routes>
                
                    <div className="container-fluid mt-4 d-flex row g-5">
                        <main className='col-md-8 bg-transparent'>
                            {/**Lista de incidencias */}
                            <br/>
                        </main>
                        <button className='btn btn-primary m-2' onClick={()=>{
                                localStorage.removeItem('usuarioLogueado');
                                setUsuarioLogueado(null);
                            }}>Cerrar sesión</button>
                    </div>
                </div>
                }
            </div>
            
            <Footer />
        </div>
    );
}

export default App;