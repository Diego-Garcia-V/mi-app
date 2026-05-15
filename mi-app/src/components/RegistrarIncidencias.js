import React, { useState } from 'react';
import Form from './Form';

function RegistrarIncidencias() {
    //Definicion de la URL de la API para las incidencias
    const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';

    //Definicion de las variables incidencias y usuarios
    const [incidencias, setIncidencias] = useState([]);
    const [usuarios] = useState([]);

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
    }

    return (
        <div>
            <h1 className='mb-4 text-center bg-light'>Esta es la página para registrar incidencias</h1>
            <aside className='col-md-4 bg-transparent'>
                <Form agregarIncidencia={agregarIncidencia} />
            </aside>
        </div>
    );
}
export default RegistrarIncidencias;