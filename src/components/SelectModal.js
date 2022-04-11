import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import {
  createSelect,
  deleteSelect,
 
} from "../http/SelectApi";
import trash from "./../imgs/trash_icon.svg";


function SelectModal({ setVisible, item }) {
  const [selects, setSelects] = useState([]);

  const [ball, setBall] = useState("");
  const [name, setName] = useState("");

  function deleteFunc(id) {
    deleteSelect(id).then((data) => {
      setSelects([...selects.filter((sel) => sel.id !== id)]);
    });
  }

  function createSelectFunc() {
    if (name) {
      createSelect({ name: name, ball: Number(ball), itemId: item.id }).then(
        (data) => {
          setSelects([...selects, data]);
          setBall("");
          setName("");
        }
      );
    }
  }

  function close() {
      window.location.reload();
  }

  return (
    <div>
        
      <div className="select_edit">
        <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Добавить значения списка
        </h4>
        <Row style={{ marginBottom: "1.5rem" }}>
          <Col md={6}>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              style={{ marginTop: "0rem", height: "38px" }}
              placeholder="Введите название..."
              className="sel"
              type="text"
            />
          </Col>
          <Col md={3}>
            <input
              onChange={(e) => setBall(e.target.value)}
              value={ball}
              style={{ marginTop: "0rem", height: "38px" }}
              placeholder="Введите балл..."
              className="sel"
              type="number"
            />
          </Col>
          <Col md={3}>
            <Button onClick={createSelectFunc} variant="primary">
              Добавить
            </Button>
          </Col>
        </Row>

        {selects && selects.length ? (
          selects.map((sel) => (
            <Row
              style={{ marginLeft: "0rem" }}
              className="select_name"
              key={sel.id}
            >
              <Col md={6}>{sel.name}</Col>
              <Col md={3} style={{ textAlign: "center", fontSize: "20px" }}>
                {sel.ball}
              </Col>
             <Col md={1} ></Col>
              <Col md={1}>
                <img
                  onClick={() => deleteFunc(sel.id)}
                  style={{
                    height: "28px",
                    cursor: "pointer",
                  }}
                  md={1}
                  src={trash}
                  alt=""
                />
              </Col>
            </Row>
          ))
        ) : (
          <></>
        )}
      </div>
    <div style={{ marginTop: "5rem" }}>
        <Button variant="dark" onClick={close}>
          Закрыть
        </Button>
      </div>
    </div>
  );
}

export default SelectModal;
