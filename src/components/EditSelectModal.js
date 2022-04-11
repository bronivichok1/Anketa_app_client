
import { Button } from "react-bootstrap";
import { updateSelect } from "../http/SelectApi";


function EditSelectModal({ setVisible, setSelect, select }) {
  
  const updateSelectFunc = () => {
    updateSelect(select.id, select).then((data) => {
      setSelect({});
      setVisible(false);
      window.location.reload();
    });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
        Редактировать значение списка
      </h3>
      <div className="cath_modal">
        <input
          className="sel"
          onChange={(e) => setSelect({ ...select, name: e.target.value })}
          value={select.name || ""}
          type="text"
          placeholder="Введите название..."
        />
        <input
          className="sel"
          onChange={(e) => setSelect({ ...select, ball: e.target.value })}
          value={select.ball || 0}
          type="number"
          placeholder="Введите балл..."
        />

      </div>

      <div style={{ marginTop: "5rem" }}>
        <Button variant="dark" onClick={() => setVisible(false)}>
          Отменить
        </Button>
        <Button
          onClick={updateSelectFunc}
          style={{ marginLeft: "5px" }}
          variant="primary"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}

export default EditSelectModal;
