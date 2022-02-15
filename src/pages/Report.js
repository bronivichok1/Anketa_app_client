import { Container } from "react-bootstrap";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Report = () => {
    return(
        <div>
            <NavBar/>
            <Container style={{marginTop: '7rem'}}>
                <main>
                    <h2 style={{textAlign: 'center', color: '#0b5ed7'}} >Добавить анкету</h2>
                    <Blank/>
                </main>
            </Container>
            <Footer/>
        </div>
    );
}

export default Report;