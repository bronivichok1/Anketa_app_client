import { Container } from "react-bootstrap";
import AdminNavBar from "../components/AdminNavBar";
import AdminUsers from "../components/AdminUsers";
import Footer from "../components/Footer";

const Admin = () => {
    return(
        <div className="wrapper" >
      <AdminNavBar />
      <div className="main" >
        <Container style={{ marginTop: "7rem" }}>
          <h2 style={{ textAlign: "center", color: "#0b5ed7" }}>
          Администраторская панель управления Системой менеджмента качества
          </h2>
        </Container>
        <main>
          <AdminUsers/>
        </main>
      </div>
      <Footer />
    </div>
    );
}

export default Admin;