import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import EditCathBlank from "../components/EditCathBlank";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const EditCathReport = observer( () => {

    return(
        <div className="wrapper" >
      <NavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
            Редактировать кафедральный отчёт
          </h2>
        </Container>
        <main>
          <EditCathBlank/>
        </main>
      </div>
      <Footer />
    </div>
    );
})

export default EditCathReport;