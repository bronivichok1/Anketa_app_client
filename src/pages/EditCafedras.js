import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import AdminNavBar from "../components/AdminNavBar";
import Cathedras from "../components/Cathedras";
import Footer from "../components/Footer";

const EditCafedras = observer( () => {
    return(
        <div className="wrapper" >
        <AdminNavBar />
        <div className="main" >
          <main>
            <Cathedras/>
          </main>
          
        </div>
        <Footer />
      </div>
    );
})

export default EditCafedras;