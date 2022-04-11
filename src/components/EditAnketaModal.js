import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { updateItem } from "../http/ItemApi";
import { createSelect, deleteSelect, fetchOneSelect, fetchSelects } from "../http/SelectApi";
import trash from "./../imgs/trash_icon.svg";
import edit from "./../imgs/edit_icon.svg";
import MyModal from "../UI/MyModal/MyModal";
import EditSelectModal from "./EditSelectModal";

function EditAnketaModal({ setVisible, setItem, item }) {
  const [selects, setSelects] = useState([]);

  const [ball, setBall] = useState('');
  const [name, setName] = useState('');

  const [sel, setSel] = useState(false);
  const [select, setSelect] = useState({});

  function createSelectFunc() {
      if(name) {
        createSelect({name: name, ball: Number(ball), itemId: item.id}).then(data => {
            setSelects([...selects, data]);
            setBall('');
            setName('');
        })
      }
  }

  function deleteFunc(id) {
    deleteSelect(id).then(data => {
        setSelects([...selects.filter(sel => sel.id !== id)]);
    })
  }

  useEffect(() => {
    if (item.type === "Список") {
      fetchSelects({ itemId: item.id }).then((data) => setSelects(data));
    }
  }, [item]);

  const updateItemFunc = () => {
    updateItem(item.id, item).then((data) => {
      setItem({});
      setVisible(false);
      window.location.reload();
    });
  };

  function editFunc(id) {
    setSel(true);
    fetchOneSelect(id).then(data => setSelect(data));
}

  return (
    <div >
         <MyModal visible={sel} setVisible={setSel}>
        <EditSelectModal
          setSelect={setSelect}
          select={select}
          setVisible={setSel}
        />
      </MyModal>
      <h3 style={{textAlign: 'center', marginTop: '2rem'}} >
        Редактировать пункт
      </h3>
      <div className="cath_modal">
        <textarea
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          value={item.name || ""}
          type="text"
          placeholder="Введите название пункта..."
          className="text_edit"
        />

        {
            item.type === 'Ввод данных' || item.type === 'Массив данных' || item.type === 'Да/Нет'
            ? <input
            className="sel"
            onChange={(e) => setItem({ ...item, ball: e.target.value })}
            value={item.ball || ""}
            type="number"
            placeholder="Введите балл..."
          />
            : <></>
        }

        {
             item.type === 'Ввод данных' || item.type === 'Массив данных'
            ? <input
            className="sel"
            onChange={(e) => setItem({ ...item, formula: e.target.value })}
            value={item.formula || ""}
            type="text"
            placeholder="Введите формулу..."
          />
            : <></>
        }

        <textarea
          onChange={(e) => setItem({ ...item, help: e.target.value })}
          value={item.help || ""}
          type="text"
          placeholder="Введите подсказку..."
          className="text_edit"
        />

        <select
          className="sel"
          onChange={(e) => setItem({ ...item, type: e.target.value })}
          value={item.type || ""}
        >
          <option value=""></option>
          <option value="Массив данных">Массив данных</option>
          <option value="Сумма">Сумма</option>
          <option value="Список">Список</option>
          <option value="Ввод данных">Ввод данных</option>
          <option value="Да/Нет">Да/Нет</option>
        </select>

        {item.type === "Список" ? (
          <div className="select_edit">
              <h4 style={{textAlign: 'center', marginBottom: '2rem'}} >Редактировать значения списка</h4>
            <Row style={{marginBottom: '1.5rem'}} >
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
                <Button onClick={createSelectFunc} variant="primary">Добавить</Button>
              </Col>
            </Row>

            {selects && selects.length ? (
              selects.map((sel) => (
                <Row style={{marginLeft: '0rem'}} className="select_name" key={sel.id}>
                  <Col md={6} >{sel.name}</Col>
                  <Col md={3} style={{textAlign: 'center', fontSize: '20px'}}  >{sel.ball}</Col>
                  <Col md={1}>
                    <img
                     onClick={() => editFunc(sel.id)}
                      style={{ height: "25px", cursor: "pointer" }}
                      src={edit}
                      alt=""
                    />
                  </Col>
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
        ) : (
          <></>
        )}
      </div>

      <div style={{ marginTop: "5rem" }}>
        <Button variant="dark" onClick={() => setVisible(false)}>
          Отменить
        </Button>
        <Button
          onClick={updateItemFunc}
          style={{ marginLeft: "5px" }}
          variant="primary"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default EditAnketaModal;
