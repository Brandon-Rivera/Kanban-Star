import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../Contexts/ThemeContext";

//Importaciones de bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

//Importaciones de iconos
import { BiLogOut } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { useContext } from "react";

const NavBar = ({ onClickSettings }) => {
  const { theme } = useContext(ThemeContext);

  const [t] = useTranslation("global");

  const navigate = useNavigate();

  //Funcion para cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem("apikey");
    localStorage.removeItem("domain");
    localStorage.removeItem("userid");
    navigate("/");
  };

  const navBarTheme = () => {
    if (theme === "dark") {
      return theme;
    } else {
      return "primary";
    }
  };

  return (
    <div className="Navbar">
      <Navbar collapseOnSelect expand="lg" bg={navBarTheme()} fixed="top">
        <Container>
          <Navbar.Brand onClick={() => navigate("/workspace")}>
            <img
              src="/assets/Kanbanize-blanco.png"
              width="150"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="navIcon"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Button variant={navBarTheme()} onClick={onClickSettings}>
                <BsFillGearFill size={45} variant={theme} />{" "}
                {t("navbar.config")}{" "}
              </Button>

              <Button variant={navBarTheme()} onClick={() => handleLogout()}>
                <BiLogOut size={45} variant={theme} /> {t("navbar.logout")}{" "}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
