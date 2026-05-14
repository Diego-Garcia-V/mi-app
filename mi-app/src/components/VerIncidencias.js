import React, { useEffect, useState } from 'react';
import MiLista from './MiLista';

function VerIncidencias() {
    //Definicion de la URL de la API para las incidencias
    const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
    //Definicion de la URL de la API para ls usuarios
    const USUARIO_API_URL = 'http://localhost:3004/users';

    //Definicion de las variables incidencias y usuarios
        const [incidencias, setIncidencias] = useState([]);
        const [usuarios, setUsuarios] = useState([]);

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

    return (
        <div>
            <h1 className='mb-4 text-center bg-light'>Esta es la página para visualizar incidencias</h1> 
            <MiLista incidencias={incidencias} usuarios={usuarios}/>    
        </div>
    );
}
export default VerIncidencias;