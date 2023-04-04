import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiFillMessage } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";

export const NavBar = () => {

	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.setItem("apikey", null);
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
						<Nav.Link><BsFillGearFill size={45} color={'white'}/></Nav.Link>
						<Nav.Link><AiFillMessage size={45} color={'white'}/></Nav.Link>
						<Nav.Link onClick={() => handleLogout()}><BiLogOut size={45} color={'white'}/></Nav.Link>	
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;