import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Context } from "..";
import "tippy.js/dist/tippy.css";
import trash from "./../imgs/trash_icon.svg";
import edit from "./../imgs/edit_icon.svg";
import MyModal from "../UI/MyModal/MyModal";
import { deleteCathedra, fetchCathedras, fetchOneCathedra } from "../http/CathedraApi";
import { fetchCath_type } from "../http/Cath_typeApi";
import { fetchFaculties } from "../http/FacultyApi";
import { observer } from "mobx-react-lite";
import EditCathedrasModal from "./EditCathedrasModal";
import CathedrasModal from "./CathedraModal";

const Cathedras = observer( () => {

    const {cathedra} = useContext(Context);

  const [cathBool, setCathBool] = useState(false);
  const [cath, setCath] = useState({});
  const [modal, setModal] = useState(false);


  useEffect(() => {
    fetchCathedras().then((data) => cathedra.setCathedras(data));
    fetchCath_type().then((data) => cathedra.setTypes(data));
    fetchFaculties().then(data => cathedra.setFaculties(data));
  }, []);

  function editFunc(id) {
    setCathBool(true);
    fetchOneCathedra(id).then(async data => {
        setCath(data);
    });
}

  function deleteFunc(id) {
    
   deleteCathedra(id).then(data => {
     window.location.reload();
   })
  }


  return (
    <div className="wrap">
      <MyModal visible={cathBool} setVisible={setCathBool}>
        <EditCathedrasModal
          setCath={setCath}
          cath={cath}
          setVisible={setCathBool}
        />
      </MyModal>

      <MyModal visible={modal} setVisible={setModal}>
        <CathedrasModal
          setVisible={setModal}
        />
      </MyModal>

      <Row style={{marginTop: "7rem" }}>
        <Col md={10}>
        <h2 style={{ color: "#0b5ed7" }}>
            Редактирование списка кафедр
            </h2>
        </Col>
        <Col md={2}>
        <Button onClick={() => setModal(true)} variant="primary" >
          Добавить кафедру
        </Button>
        </Col>
      </Row>
      
      <Row
        style={{ marginTop: "4rem", marginBottom: "1rem" }}
        className="blankHead"
      >
        <Col md={4}>Название</Col>
        <Col md={2}>Значение</Col>
        <Col md={2}>Тип</Col>
        <Col md={2}>Факультет</Col>
       
      </Row>

      {cathedra.cathedras.map((el) => (
        <Row className="blankItem" key={el.id}>
          <Col md={4}>
             {el.name}
          </Col>
          <Col  md={2}>
            {el.clin_or_teor}
          </Col>
          <Col md={2}>
            {cathedra.types.map(t => 
                t.id === el.cath_type_id
                ? t.name
                : ''
                )}
          </Col>
          <Col md={2}>
          {cathedra.faculties.map(t => 
            t.id === el.faculty_id
            ? t.name
            : ''
            )}</Col>
         
          <Col md={1} >
            <img
            onClick={() => editFunc(el.id)}
              style={{ height: "27px", cursor: "pointer" }}
              src={edit}
              alt=""
            />
          </Col>
          <Col md={1} >
          <img
            onClick={() => deleteFunc(el.id)}
              style={{ height: "30px", marginLeft: "30px", cursor: "pointer" }}
              md={1}
              src={trash}
              alt=""
            />
          </Col>
        </Row>
      ))}
    </div>
  );
})

export default Cathedras;
