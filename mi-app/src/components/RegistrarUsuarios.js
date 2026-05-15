import React, { useState, useEffect } from 'react';
import Form from './FormUsuario';

function RegistrarUsuarios() {
    //Definicion de la URL de la API para ls usuarios
    const USUARIO_API_URL = 'http://localhost:3004/users';    
    //Definicion de la variable usuarios
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch(USUARIO_API_URL)
            .then(res => res.json())
            .then(data => setUsuarios(data))
            .catch(err => console.error("Error cargando usuarios", err));
    }, []);

    const agregarUsuario = async (nombre, email, password) => {
        try{
            // Validar si el email ya existe (No queremos duplicados)
            const existe = usuarios.find(u => u.email === email);
            
            if (existe) {
                alert("El usuario ya existe con ese email");
                return false;
            }

            const nuevo_usuario = {
                "id":(usuarios.length+1).toString(),
                "nombre":nombre,
                "email":email,
                "password":password,
            }

            const response = await fetch(USUARIO_API_URL, 
                {
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(nuevo_usuario),
                }
            );
            if(!response.ok){
                throw new Error('Fallo la petición POST del usuario.');
            }
            const usuarioCreado = await response.json();

            setUsuarios([...usuarios, usuarioCreado]);
            //Actualizar el estado de React con el nuevo elemento
                alert('Usuario creado correctamente');
                return true;
        }catch(error){
            console.error('Error al registrar usuario por API', error);
            return false;
        }
    }

    return (
        <div>
            <h1 className='mb-4 text-center bg-light'>Esta es la página para registrar usuarios</h1>
            <aside className='col-md-4 bg-transparent'>
                <Form agregarUsuario={agregarUsuario} />
            </aside>
        </div>
    );
}
export default RegistrarUsuarios;