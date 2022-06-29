import { Button, Container, Nav, Navbar } from "react-bootstrap";
import icon from './../imgs/anketa_iconn.svg';
import { useMediaQuery } from 'react-responsive';
import {  useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, REPORT_ROUTE, SEE_REPORTS_ROUTE } from "../utils/consts";
import { useContext } from "react";
import { Context } from "..";

const NavBar = () => {
    const mobile = useMediaQuery({ query: '(max-width: 980px)' })
    const { user } = useContext(Context);
    const navigate = useNavigate();

    function out() {
      localStorage.removeItem('token');
      window.location.reload();
    }

  return (
    <header>
      <Navbar bg="dark" fixed="top" collapseOnSelect expand="lg" variant="dark">
        <Container>
          <Navbar.Brand className="nav-brand">
           {
               mobile
               ? <img style={{height: '50px'}} alt="" src={icon}/>
               : <div>Менеджмент качества работы сотрудников кафедр</div>
           }
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav style={{ color: "white" }}>
              <Button onClick={() => navigate(REPORT_ROUTE)} variant="outline-light">Добавить анкету</Button>
              <Button onClick={() => navigate(SEE_REPORTS_ROUTE)} style={
                  mobile
                  ? { marginLeft: "0px" }
                  : { marginLeft: "10px" }
              } variant="outline-light">
                Посмотреть анкеты
              </Button>
              <Button onClick={out} style={
                  mobile
                  ? { marginLeft: "0px" }
                  : { marginLeft: "20px" }
              } variant="outline-primary">
                Выход
              </Button>
              {user.isAuth
              ? <Button onClick={() => navigate(ADMIN_ROUTE)} style={
                mobile
                ? { marginLeft: "0px" }
                : { marginLeft: "10px" }
               } variant="outline-primary">
                Админ
                </Button>
              : <></>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
