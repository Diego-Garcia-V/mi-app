import React from "react";

function MiListaUsuarios(props) {
    return (
        <table className="card p-4 table table-striped table-secondary table-hover align-middle shadow-sm">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Contraseña</th>
                </tr>
            </thead>
            <tbody>
                {props.usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.password}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default MiListaUsuarios;