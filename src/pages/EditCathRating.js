import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import AdminNavBar from "../components/AdminNavBar";
import EditRating from "../components/EditRating";
import Footer from "../components/Footer";

const EditCathRating = observer( () => {

    return(
        <div className="wrapper" >
      <AdminNavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
            Редактировать кафедральный рейтинг
          </h2>
        </Container>
        <main>
          <EditRating/>
        </main>
      </div>
      <Footer />
    </div>
    );
})

export default EditCathRating;