import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { fetchMassivItems } from "../http/ItemApi";
import MyModal from "../UI/MyModal/MyModal";
import { SEE_REPORTS_ROUTE } from "../utils/consts";
import CreateBookModal from "./CreateBookModal";

const CreateBooks = observer(() => {
  const navigate = useNavigate();

  const { book } = useContext(Context);

  const [id, setId] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchMassivItems().then(data => {
        book.setMassivItems(
            [...data.map(el => {
                return {...el, 
                    books: []
                }
            })]
        );
    })
  }, [])

  const addBook = (id) => {
    setId(id);
    setModal(true);
  }

  return (
    <div>
        <MyModal visible={modal} setVisible={setModal}>
        <CreateBookModal id={id} setVisible={setModal} />
      </MyModal>
      <Container>

       <div style={{marginTop: '3rem'}} >
       {book.massivItems.map(item =>
            <Row className="bookItem" key={item.id} >
              <Col md={11} > {item.num}. {item.name}</Col>
              <Col> <Button onClick={() => addBook(item.id)} variant="primary">+</Button> </Col>
            </Row>
            )}
       </div>

        <Row style={{ marginTop: "3rem" }}>
          <Col lg={6}>
            <Button
              style={{
                fontFamily: "var(--bs-body-font-family)",
                fontWeight: "500",
                marginTop: "15px",
              }}
              variant="primary"
            >
              Сохранить отчёт
            </Button>

            <Button
              onClick={() => navigate(SEE_REPORTS_ROUTE)}
              style={{
                fontFamily: "var(--bs-body-font-family)",
                fontWeight: "500",
                marginTop: "15px",
                marginLeft: "10px",
              }}
              variant="dark"
            >
              Отмена
            </Button>
          </Col>
          <Col lg={6}></Col>
        </Row>
      </Container>
    </div>
  );
});

export default CreateBooks;
