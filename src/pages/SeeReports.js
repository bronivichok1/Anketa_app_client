import { Container } from "react-bootstrap";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const SeeReports = () => {
  return (
    <div className="wrapper" >
      <NavBar />
    <div className="main">
    <Container style={{ marginTop: "7rem" }}>
        <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
          Фильтр отбора
        </h2>
      </Container>
      <Filter/>
    </div>
      <Footer />
    </div>
  );
};

export default SeeReports;
