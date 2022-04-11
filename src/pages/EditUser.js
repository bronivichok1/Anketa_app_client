import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EditBlank from "../components/EditBlank";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const EditUser = observer( () => {

    return(
        <div className="wrapper" >
      <NavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
            Редактировать сотрудника
          </h2>
        </Container>
        <main>
            <EditBlank/>
        </main>
      </div>
      <Footer />
    </div>
    );
})

export default EditUser;