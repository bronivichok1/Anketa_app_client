import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const EditCathRating = observer( () => {

    return(
        <div className="wrapper" >
      <NavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
            Кафедральный рейтинг
          </h2>
        </Container>
        <main>
        </main>
      </div>
      <Footer />
    </div>
    );
})

export default EditCathRating;