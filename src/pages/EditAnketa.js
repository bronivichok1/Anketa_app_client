import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Context } from "..";
import AdminNavBar from "../components/AdminNavBar";
import EditAnketaItems from "../components/EditAnketaItems";
import Footer from "../components/Footer";
import { fetchItems } from "../http/ItemApi";

const EditAnketa = () => {


    return(
        <div className="wrapper" >
      <AdminNavBar />
      <div className="main" >
        <main>
        <EditAnketaItems/>
        </main>
      </div>
      <Footer />
    </div>
    );
}

export default EditAnketa;