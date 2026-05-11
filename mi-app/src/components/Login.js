import { useState } from "react";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const envioFormulario = (e) => {
        e.preventDefault();
        const form = e.target;
        props.onLogin(form.email.value, form.password.value);
    }

    return (
        <div>
            <form onSubmit={envioFormulario}>
                <h2>Inicio de sesión:</h2>
                <label className="mb-1 form-label">E-mail </label><br/>
                <input className="mb-1 form-control" 
                        type="email" 
                        name="email" 
                        placeholder="Introduzca su correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required/><br/>
                <label className="mb-1 form-label">Contraseña </label><br/>
                <input className="mb-1 form-control" 
                        type="password" 
                        name="password" 
                        placeholder="Introduzca su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required/>
                <button className="btn btn-primary" type="submit">Iniciar sesión</button>   
            </form>
        </div>
    );
}
export default Login;