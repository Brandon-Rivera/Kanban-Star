import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


export const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            email: email,
            pass: pass
        };
        console.log(values);

        const response = await fetch(`http://localhost:3001/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="auth-form-container">
            <h1>¡Bienvenido!</h1>
            <h2>Introduce tus credenciales de Kanbanize</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">correo electrónico</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tucorreo@gmail.com" id="email" name="email" />
                <label htmlFor="password">contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="pass" name="pass" />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}