import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const form = useRef();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const formData = new FormData(form.current);
        console.log(email);
        console.log(pass);
        const values = {email: email, pass: pass}

        const response = await fetch(`https://university6y.kanbanize.com/index.php/api/kanbanize/login/`, { mode: 'no-cors'},
            {method: 'POST', body: JSON.stringify(values)}
        );
        const data = await response.json();

        console.log('apikey: ', data.apikey);

        if(data.apikey !== ''){
            localStorage.setItem('apikey', data.apikey);
            navigate("/workspace");
        }
    }

    return (
        <div className="auth-form-container">
            <h1>¡Bienvenido!</h1>
            <h2>Introduce tus credenciales de Kanbanize</h2>
            <form className="login-form" ref={form} onSubmit={handleSubmit}>
                <label htmlFor="email">correo electrónico</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="tucorreo@gmail.com" id="email" name="email" />
                <label htmlFor="password">contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="pass" name="pass" />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}