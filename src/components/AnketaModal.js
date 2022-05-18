import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { createItem } from "../http/ItemApi";
import MyModal from "../UI/MyModal/MyModal";
import SelectModal from "./SelectModal";

function AnketaModal({ setVisible, items }) {
  const mobile = useMediaQuery({ query: "(max-width: 900px)" });

  const [type, setType] = useState("");
  const [ball, setBall] = useState("");
  const [name, setName] = useState("");
  const [formula, setFormula] = useState('');
  const [help, setHelp] = useState("");
  const [num, setNum] = useState("");

  const [show, setShow] = useState(false)
  const [item, setItem] = useState({});

  useEffect(() => {
    if(type) {
      if(type === "Ввод данных") {
        setFormula('Балл*Ввод');
        setBall(1);
      } else if(type === "Массив данных") {
        setFormula('Балл/Ввод < 50 ? 50 : Балл/Ввод');
        setBall(100);
      }
    }
  }, [type])

  async function createItemFunc() {
    if (name && num && type) {

      let parent;

      let n = num.split('.');
      n.pop();
      n = n.join('.')

      await items.forEach(el => {
        if(el.num === n) {
          parent = el;
        }
      })

      console.log(parent)

      if (!parent && num.split(".").length > 1) {
        alert("Сначала нужно создать родительский пункт!");
        return;
      }

      const re = /([0-9])(\.[0-9])*/g;
      if(!re.test(String(num).toLowerCase())) {
        alert("Номер пункта не соответствует формату!");
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
        } else {
           window.location.reload();
        }

        setBall("");
        setName("");
        setFormula("");
        setHelp("");
        setNum("");
        setType("");
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
         style={mobile ? {} : {minWidth: '800px'}}
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
