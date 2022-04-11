import { useState } from "react";
import { Button } from "react-bootstrap";
import { createItem } from "../http/ItemApi";
import MyModal from "../UI/MyModal/MyModal";
import SelectModal from "./SelectModal";

function AnketaModal({ setVisible, items }) {
  const [ball, setBall] = useState("");
  const [name, setName] = useState("");
  const [formula, setFormula] = useState("");
  const [help, setHelp] = useState("");
  const [type, setType] = useState("");
  const [num, setNum] = useState("");

  const [show, setShow] = useState(false)
  const [item, setItem] = useState({});

  async function createItemFunc() {
    if (name && num && type) {
      const parent = await items.find(
        (el) => num.replace(/..$/, "") === el.num
      );

      if (!parent && num.split(".").length > 1) {
        alert("Сначала нужно создать родительский пункт!");
        return;
      }

      createItem({
        num: num,
        name: name,
        ball: ball ? Number(ball) : null,
        help: help ? help : null,
        formula: formula ? formula : null,
        type: type,
      }).then((data) => {

        if(type === 'Список') {
            setItem(data);
            setShow(true);
        }

        setBall("");
        setName("");
        setFormula("");
        setHelp("");
        setNum("");
        setType("");
        // window.location.reload();
      });
    } else {
      alert("Номер, название и тип не могут быть пустыми!");
    }
  }

  return (
    <div>
         <MyModal visible={show} setVisible={setShow}>
        <SelectModal
          item={item}
          setVisible={setShow}
        />
      </MyModal>
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Создать пункт</h3>
      <div className="cath_modal">
        <select
          className="sel"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <option value=""></option>
          <option value="Массив данных">Массив данных</option>
          <option value="Сумма">Сумма</option>
          <option value="Список">Список</option>
          <option value="Ввод данных">Ввод данных</option>
          <option value="Да/Нет">Да/Нет</option>
        </select>

        <input
          className="sel"
          onChange={(e) => setNum(e.target.value)}
          value={num}
          type="text"
          placeholder="Введите номер пункта..."
        />

        <textarea
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Введите название пункта..."
          className="text_edit"
        />

        {type === "Ввод данных" ||
        type === "Массив данных" ||
        type === "Да/Нет" ? (
          <input
            className="sel"
            onChange={(e) => setBall(e.target.value)}
            value={ball}
            type="number"
            placeholder="Введите балл..."
          />
        ) : (
          <></>
        )}

        {type === "Ввод данных" || type === "Массив данных" ? (
          <input
            className="sel"
            onChange={(e) => setFormula(e.target.value)}
            value={formula}
            type="text"
            placeholder="Введите формулу..."
          />
        ) : (
          <></>
        )}

        <textarea
          onChange={(e) => setHelp(e.target.value)}
          value={help}
          type="text"
          placeholder="Введите подсказку..."
          className="text_edit"
        />
      </div>

      <div style={{ marginTop: "5rem" }}>
        <Button variant="dark" onClick={() => setVisible(false)}>
          Отменить
        </Button>
        <Button
          onClick={createItemFunc}
          style={{ marginLeft: "5px" }}
          variant="primary"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default AnketaModal;
