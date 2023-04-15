import { useNavigate } from "react-router-dom";

//Importaciones de bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//Importaciones de iconos
import { BiLogOut } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";

const NavBar = () => {

	const navigate = useNavigate();
	
	//Funcion para cerrar sesion
	const handleLogout = () => {
		localStorage.removeItem('apikey');
		localStorage.removeItem('domain');
		localStorage.removeItem('userid');
		navigate('/')
	}

	return (
		<Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
			<Container>
				<Navbar.Brand onClick={() => navigate('/')}>
					<img
						src="/assets/Kanbanize-blanco.png"
						width="150"
						height="60"
						className="d-inline-block align-top"
						alt="React Bootstrap logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
					</Nav>
					<Nav>
						<Nav.Link><BsFillGearFill size={45} color={'white'}/> Configuración</Nav.Link>
						<Nav.Link onClick={() => handleLogout()}><BiLogOut size={45} color={'white'}/> Cerrar sesión</Nav.Link>	
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;