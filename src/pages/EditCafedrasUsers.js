import { Container } from "react-bootstrap";
import AdminNavBar from "../components/AdminNavBar";
import EditCathUsers from "../components/EditCathUsers";
import Footer from "../components/Footer";

const EditCafedrasUsers = () => {
    return(
        <div className="wrapper" >
      <AdminNavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
          Редактировать кафедральных пользователей
          </h2>
        </Container>
        <main>
            <EditCathUsers/>
        </main>
      </div>
      <Footer />
    </div>
    );
}

export default EditCafedrasUsers;