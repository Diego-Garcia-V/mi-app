import React from 'react';
import "./Form.css";

function FormUsuario(props) {
    const envioFormulario = (e) => {
        e.preventDefault();
        const form = e.target;  
        props.agregarUsuario(
            form.nombre.value,
            form.email.value,
            form.password.value
        )
    };

    return (        
        <div className="card p-4 bg-light">
            <h3 className="card-title mb-4 text-center">Registrar usuario</h3>
            <form onSubmit={envioFormulario}>   
                {/**Nombre */}
                <div className="elemento-form"> 
                    <label className="mb-1 form-label">Nombre </label>
                    <input className="mb-1 form-control" type="text" name="nombre" placeholder="Ej: Luis Torres" required></input>
                    <br />  
                </div>
                {/**Email */}
                <div className="elemento-form"> 
                    <label className="mb-1 form-label">E-mail </label>
                    <input className="mb-1 form-control" type="email" name="email" placeholder="Ej: luis.torres@example.com" required></input>
                    <br />  
                </div>
                {/**Password */}
                <div className="elemento-form"> 
                    <label className="mb-1 form-label">Contraseña </label>
                    <input className="mb-1 form-control" type="password" name="password" placeholder="Ej: ********" required></input>
                    <br />  
                </div>
                {/**Boton de registro */}
                <button className="btn btn-azulOscuro mx-auto d-grid" type="submit">Registrar</button>
                <br />
            </form>
        </div>
    );
}
export default FormUsuario;