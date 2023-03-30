import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import './Login.css'


export const Login = (props) => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [domain, setDomain] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            email: email,
            pass: pass,
            domain: domain
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

        if (data.status === false) {
            setModalShow(true);
        }
        else {
            localStorage.setItem('apikey', data.apikey);
            navigate('/workspace');
        }

        console.log(data);
    }

    return (
        <div className="auth-form-container">
            <h1>¡Bienvenido!</h1>
            <h2>Introduce tus credenciales de Kanbanize</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Correo electrónico</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tucorreo@gmail.com" id="email" name="email" />
                <label htmlFor="password">Contraseña</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="pass" name="pass" />
                <label htmlFor="username">Dominio</label>
                <input value={domain} onChange={(e) => setDomain(e.target.value)} type="username" placeholder="domino" id="domain" name="domain" />
                <label/>
                <button type="submit">Iniciar sesión</button>
            </form>
            <ErrorModal show={modalShow} title='Error máster!' message='Usuario, contraseña o dominio incorrectos' onHide={() => setModalShow(false)} />
        </div>
    )
}