import { useEffect, useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { deleteItem, fetchItems, fetchOneItem } from "../http/ItemApi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import trash from "./../imgs/trash_icon.svg";
import edit from "./../imgs/edit_icon.svg";
import MyModal from "../UI/MyModal/MyModal";
import EditAnketaModal from "./EditAnketaModal";
import AnketaModal from "./AnketaModal";

const EditAnketaItems = () => {

  const [items, setItems] = useState([]);
  const [ed, setEd] = useState(false);
  const [item, setItem] = useState({});
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState('');

  const filteredItems = useMemo(() => {
     return items.filter((us) => {
       return us.num.toLowerCase().includes(value.toLowerCase());
     });
   });

  useEffect(() => {
    fetchItems().then((data) => setItems(data));
  }, []);

  function editFunc(id) {
    setEd(true);
    fetchOneItem(id).then(data => setItem(data));
}

  function deleteFunc(id, num) {
    const child = items.find(el => el.num.replace(/..$/, '') === num && el.num.split('.').length === num.split('.').length + 1);

    if(child) {
      alert('Этот пункт нельзя удалить, т.к. у него всё ещё есть подпункты!');
      return;
    }

   deleteItem(id).then(data => {
     window.location.reload();
   })
  }


  return (
    <div className="wrap">
      <MyModal visible={ed} setVisible={setEd}>
        <EditAnketaModal
          setItem={setItem}
          item={item}
          setVisible={setEd}
        />
      </MyModal>

      <MyModal visible={modal} setVisible={setModal}>
        <AnketaModal
        items={items}
          setVisible={setModal}
        />
      </MyModal>

      <Row style={{marginTop: "7rem" }}>
        <Col md={10}>
        <h2 style={{ color: "#0b5ed7"}}>
          Редактирование главной анкеты
          </h2>
        </Col>
        <Col md={2}>
        <Button onClick={() => setModal(true)} variant="primary" >
          Добавить пункт
        </Button>
        </Col>
      </Row>
      
      <Row style={{marginTop: '2rem'}} >
            <Col md={4}></Col>
            <Col md={4}>
              <input
                placeholder="Поиск пунктов..."
                className="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
              />
            </Col>
            <Col md={4}></Col>
          </Row>

      <Row
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        className="blankHead"
      >
        <Col md={6}>Название</Col>
        <Col md={2}>Формула</Col>
        <Col md={1}>Балл</Col>
        <Col md={1}>Тип</Col>
        <Col md={1}>Подсказка</Col>
      </Row>

      {filteredItems.map((el) => (
        <Row className="blankItem" key={el.id}>
          <Col md={6}>
            <span style={{fontWeight: 'bold'}} >{el.num}.</span> {el.name}
          </Col>
          <Col style={{ fontWeight: "bold" }} md={2}>
            {el.formula}
          </Col>
          <Col style={{ fontWeight: "bold" }} md={1}>
            {el.ball}
          </Col>
          <Col md={1}>{el.type}</Col>
          <Col md={1}>
            <Tippy content={el.help}>
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                className="ques"
              >
                ?
              </div>
            </Tippy>
          </Col>
          <Col>
            <img
            onClick={() => editFunc(el.id)}
              style={{ height: "27px", cursor: "pointer" }}
              src={edit}
              alt=""
            />
            <img
            onClick={() => deleteFunc(el.id, el.num)}
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
};

export default EditAnketaItems;
