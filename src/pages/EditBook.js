import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import EditBookReport from "../components/EditBookReport";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const EditBook = observer( () => {

    return(
        <div className="wrapper" >
      <NavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
           Редактировать приложение к отчету кафедры
          </h2>
        </Container>
        <main>
           <EditBookReport/>
        </main>
      </div>
      <Footer />
    </div>
    );
})

export default EditBook;