import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../Contexts/ThemeContext";
import { Image } from "react-bootstrap";
import "./css/Navbar.css"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { useContext } from "react";
import Cookies from "js-cookie";

const NavBar = ({ onClickSettings }) => {
  const { theme } = useContext(ThemeContext);

  const [t] = useTranslation("global");

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("domain");
    Cookies.remove("userid");
    Cookies.remove("boardid");
    Cookies.remove("boardname");
    navigate("/");
  };

  const redirectToKanbanize = () => {
    window.open(`https://${Cookies.get("domain")}.kanbanize.com/ctrl_dashboard`, '_blank');
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
            <p className='d-flex justify-content-start m-1 text-white' id="font-face-mb"><Image className="kanbanStarLogo" src="https://i.ibb.co/kmWdCNM/ksLogo.png" alt="KanbanStar Logo" />kanban star</p>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="navIcon"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Button variant={navBarTheme()} onClick={() => redirectToKanbanize()}>
                <img
                  src="/assets/Kanbanize-blanco.png"
                  width="150"
                  height="60"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                <FiExternalLink/>
              </Button>

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