import { Button, Container, Nav, Navbar } from "react-bootstrap";
import icon from './../imgs/anketa_iconn.svg';
import { useMediaQuery } from 'react-responsive';
import {  useNavigate } from "react-router-dom";
import { DELETE_REPORTS_ROUTE, EDIT_BLANK_ROUTE, REPORT_ROUTE, SEE_REPORTS_ROUTE } from "../utils/consts";

const AdminNavBar = () => {
    const mobile = useMediaQuery({ query: '(max-width: 980px)' })

    const navigate = useNavigate();

  return (
    <header>
      <Navbar bg="dark" fixed="top" collapseOnSelect expand="lg" variant="dark">
        <Container>
          <Navbar.Brand className="nav-brand">
           {
               mobile
               ? <img style={{height: '50px'}} alt="" src={icon}/>
               : <div>Администрирование</div>
           }
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav style={{ color: "white" }}>
              <Button onClick={() => navigate(EDIT_BLANK_ROUTE)} variant="outline-light">Редактировать анкету</Button>
              <Button onClick={() => navigate(DELETE_REPORTS_ROUTE)} style={
                  mobile
                  ? { marginLeft: "0px" }
                  : { marginLeft: "10px" }
              } variant="outline-light">
                Удаление анкет
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminNavBar;
