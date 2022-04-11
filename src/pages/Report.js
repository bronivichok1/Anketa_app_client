import { Container } from "react-bootstrap";
import Blank from "../components/Blank";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Report = () => {
  return (
    <div className="wrapper" >
      <NavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
            Добавить анкету
          </h2>
        </Container>
        <main>
          <Blank />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
