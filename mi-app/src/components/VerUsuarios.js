import React, { useEffect, useState } from 'react';
import MiListaUsuarios from './MiListaUsuarios';

function VerUsuarios() {
    //Definicion de la URL de la API para ls usuarios
    const USUARIO_API_URL = 'http://localhost:3004/users';    
    //Definicion de la variable usuarios
    const [usuarios, setUsuarios] = useState([]);

    //1. Hook para cargar las incidencias desde JSON server
    useEffect(()=>{  
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

        obtenerUsuarios();
    },[]); //Se ejecuta solo una vez al montar el componente

    return (
        <div>
            <h1 className='mb-4 text-center bg-light'>Esta es la página para visualizar usuarios</h1> 
            <MiListaUsuarios usuarios={usuarios}/>    
        </div>
    );

}
export default VerUsuarios;