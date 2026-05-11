import MiLista from '../components/MiLista';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import Fondo from "../img/instituto.png";
import Login from '../components/Login';

function App() {
    //Definicion de la URL de la API para las incidencias
    const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
    //Definicion de la URL de la API para ls usuarios
    const USUARIO_API_URL = 'http://localhost:3004/users';
    //Definicion de la URL de la API para el login
    const LOGIN_API_URL = 'http://localhost:3004/login';

    //Definicion de las variables incidencias y usuarios
    const [incidencias, setIncidencias] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
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

    //1. Hook para cargar las incidencias desde JSON server
    useEffect(()=>{  
        const obtenerIncidencias = async ()=> {
            try{
                let response = await fetch (INCIDENCIA_API_URL);
                if(!response.ok){
                    throw new Error('HTTP Error');
                }
                const data = await response.json();
                console.log(data);
                setIncidencias(data);
            }catch(e){
                console.error('Error al cargar las incidencias',e);
            }
        }
        const obtenerUsuarios = async ()=> {
            try{
                let response = await fetch (USUARIO_API_URL);
                if(!response.ok){
                    throw new Error('HTTP Error');
                }
                const data = await response.json();
                console.log(data);
                setUsuarios(data);
            }catch(e){
                console.error('Error al cargar los usuarios',e);
            }
        }

        obtenerIncidencias();
        obtenerUsuarios();
    },[]); //Se ejecuta solo una vez al montar el componente

    const agregarIncidencia = async (nuevo_usuario, nuevo_titulo, nueva_descripcion,
        nueva_categoria, nuevo_nivelUrgencia, nueva_ubicacion
    ) => {
        try{
            /**Creacion de la constante para pasar el formato de fecha */
            const fecha = new Date();
            const year = fecha.getFullYear();
            const month = String(fecha.getMonth() + 1).padStart(2, '0'); // meses 0-11
            const day = String(fecha.getDate()).padStart(2, '0');
            const fechaFormateada = `${year}-${month}-${day}`;
            /**Está instruccion no debería ser necesaria, puesto que la id se introduce de manera automática */
            const nuevo_id=incidencias.length + 1;
            const esDuplicado=incidencias.some(incidencia=>incidencia.id_incidencia===nuevo_id);
            if(esDuplicado){
                console.log("El id está duplicado, no se va a añadir la incidencia.");
            }

            const usuarioEncontrado = usuarios.find(u => u.email === nuevo_usuario);
            if(usuarioEncontrado){
                const nueva_incidencia = {
                    "id":(incidencias.length+1).toString(),
                    "usuario":usuarioEncontrado,
                    "titulo":nuevo_titulo,
                    "descripcion":nueva_descripcion,
                    "categoria":nueva_categoria,
                    "nivel_urgencia":nuevo_nivelUrgencia,
                    "fecha_registro":fechaFormateada,
                    "estado":"Abierta",
                    "ubicacion":nueva_ubicacion
                }
                const response = await fetch(INCIDENCIA_API_URL, 
                    {
                        method: 'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify(nueva_incidencia),
                    }
                );
                if(!response.ok){
                    throw new Error('Fallo la petición POST de la incidencia.');
                }

                const incidenciaCreada = await response.json();
                //Actualizar el estado de React con el nuevo elemento
                setIncidencias([...incidencias, incidenciaCreada]);
                alert('Incidencia creada correctamente');
                return true;
            }else{
                alert("Usuario no registrado");
                throw new Error('Usuario no encontrado');
            }
        }catch(error){
            console.error('Error al registrar incidencia por API', error);
            return false;
        }
        

        //Estructura utilizada con anterioridad

        /**const nueva_incidencia = {
            //Introduccion automatica del numero de incidencia
            id_incidencia: nuevo_id,
            id_usuario: nuevo_usuario,
            titulo: nuevo_titulo,
            descripcion: nueva_descripcion,
            categoria: nueva_categoria,
            nivel_urgencia: nuevo_nivelUrgencia,
            fecha_registro: fechaFormateada,
            estado: "Abierta",
            ubicacion: nueva_ubicacion
        }
        //Metodo usado para modificar la propiedad de la clase 
        setIncidencias(
            [...incidencias, nueva_incidencia]
        );
        //Visualización de datos pasados a traves del formulario por consola 
        console.log("Datos recibidos: ", nueva_incidencia);**/
    }

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
                    <div className="container-fluid mt-4 d-flex row g-5">
                        <main className='col-md-8 bg-transparent'>
                            {/**Lista de incidencias */}
                            <br/>
                            <h4 className='mb-4 text-center bg-light'> Esta aplicación muestra el contenido almacenado de mi App.</h4>
                            <MiLista incidencias={incidencias} />
                        </main>
                        <aside className='col-md-4 bg-transparent'>
                            <Form agregarIncidencia={agregarIncidencia} />
                        </aside>
                        <button onClick={()=>{
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