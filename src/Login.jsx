import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        navigate("/workspace");
    }

    return (
        <div className="auth-form-container">
            <h1>¡Bienvenido!</h1>
            <h2>Introduce tus credenciales de Kanbanize</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">correo electrónico</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="tucorreo@gmail.com" id="email" name="email" />
                <label htmlFor="password">contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}