import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react-lite";
import { fetchOneTable, fetchTables } from "../http/RatingTablesApi";
import edit from "./../imgs/edit_icon.svg";
import trueImg from "./../imgs/true.svg";
import falseImg from "./../imgs/false.svg";
import MyModal from "../UI/MyModal/MyModal";
import EditRatingModal from "./EditRatingModal";


const EditRating = observer(() => {
  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  const { rating } = useContext(Context);

  const [table, setTable] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchTables().then((data) => {
      rating.setRatingTables(data);
    });
  }, []);

  function editFunc(id) {
    setModal(true);
    fetchOneTable(id).then(async data => {
        setTable(data);
    });
}


  return (
    <div>

      <Container>

      <MyModal visible={modal} setVisible={setModal}>
        <EditRatingModal
          setTable={setTable}
          table={table}
          setVisible={setModal}
        />
      </MyModal>

        <Row
          style={{ marginTop: "4rem", marginBottom: "1rem" }}
          className="blankHead"
        >
          <Col>Название</Col>
          <Col>Статус</Col>
        </Row>

        {rating.ratingTables.map((el) => (
          <Row className="blankItem" key={el.id}>
            <Col>{el.name}</Col>
            <Col>{el.active
            ? <img  style={{height: "35px", marginLeft: '4rem' }} src={trueImg} alt="" />
            : <img  style={{ height: "29px", marginLeft: '4.2rem' }} src={falseImg} alt="" />
            }</Col>
            <Col md={1} >
                <img onClick={() => editFunc(el.id)} style={{ height: "27px", cursor: "pointer" }} src={edit} alt="" />
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
});

export default EditRating;
