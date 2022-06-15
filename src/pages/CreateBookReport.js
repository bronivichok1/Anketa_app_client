import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import CreateBooks from "../components/CreateBooks";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const CreateBookReport = observer( () => {

    return(
        <div className="wrapper" >
      <NavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
           Создать книжный отчёт
          </h2>
        </Container>
        <main>
            <CreateBooks/>
        </main>
      </div>
      <Footer />
    </div>
    );
})

export default CreateBookReport;