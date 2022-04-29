
import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { observer } from "mobx-react-lite";
import { updateTable } from "../http/RatingTablesApi";

const EditRatingModal = observer( ({ setVisible, setTable, table }) => {

  const mobile = useMediaQuery({ query: "(max-width: 900px)" });


  const updateTableFunc = () => {
    updateTable(table.id, table).then((data) => {
      setTable({});
      setVisible(false);
      window.location.reload();
    });
  };


  return (
    <div >
      <h3 style={{textAlign: 'center', marginTop: '2rem'}} >
        Редактировать колонку
      </h3>
      <div className="cath_modal">
        <input
          onChange={(e) => setTable({ ...table, name: e.target.value })}
          value={table.name || ''}
          type="text"
          placeholder="Введите название колонки..."
          className="cusInput"
        />

        <div
        style={{fontWeight: 'bold'}}
        >
        <input
                style={{marginRight: '5px', marginLeft: '10px'}}
                checked={
                 table.active || ''
                }
                onChange={() => {
                 setTable({...table, active: true})
                }}
                name=''
                type="radio"
                id={table.id}
                value='Добавить'
                className="yes_no"
              />
              <label className="yes_no" htmlFor={table.id}>
              Добавить
              </label>

              <input
              style={{marginRight: '5px', marginLeft: '10px'}}
                checked={
                   !table.active || ''
                }
                className="yes_no"
                onChange={() => {
                    setTable({...table, active: false})
                }}
                name=''
                type="radio"
                id={table.name}
                value="Убрать"
              />
              <label className="yes_no" htmlFor={table.name}>
             Убрать
              </label>
        </div>
      
      </div>

      <div style={{ marginTop: "5rem" }}>
        <Button variant="dark" onClick={() => setVisible(false)}>
          Отменить
        </Button>
        <Button
          onClick={updateTableFunc}
          style={{ marginLeft: "5px" }}
          variant="primary"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
})

export default EditRatingModal;