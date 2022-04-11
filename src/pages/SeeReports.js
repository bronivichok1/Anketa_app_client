import { Container } from "react-bootstrap";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const SeeReports = () => {
  return (
    <div className="wrapper" >
      <NavBar />
      <Container className="main" style={{ marginTop: "7rem" }}>
        <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
          Фильтр отбора
        </h2>
        <Filter/>
      </Container>
      <Footer />
    </div>
  );
};

export default SeeReports;
