import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { updateCathedra } from "../http/CathedraApi";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const EditCathedrasModal = observer(({ setVisible, setCath, cath }) => {
  const { cathedra } = useContext(Context);

  const mobile = useMediaQuery({ query: "(max-width: 900px)" });

  const updateCathFunc = () => {
    updateCathedra(cath.id, cath).then((data) => {
      setCath({});
      setVisible(false);
      window.location.reload();
    });
  };


  return (
    <div >
      <h3 style={{ textAlign: 'center', marginTop: '2rem' }} >
        Редактировать кафедру
      </h3>
      <div className="cath_modal">
        <textarea
          style={mobile ? {} : { minWidth: '800px' }}
          onChange={(e) => setCath({ ...cath, name: e.target.value })}
          value={cath.name || ""}
          type="text"
          placeholder="Введите название кафедры..."
          className="text_edit"
        />

        <div
          style={{ fontWeight: 'bold' }}
        >
          {cathedra.values && cathedra.values.map((value, index) => (
            <>
              <input
                style={{ marginRight: '5px', marginLeft: '10px' }}
                checked={cath.clin_or_teor === value.id}
                onChange={(e) => {
                  const select = parseInt(e.target.value);
                  setCath({ ...cath, clin_or_teor: select });
                }}
                name={value.name}
                type="radio"
                id={index}
                value={value.id}
                className="yes_no"
              />
              <label className="yes_no" htmlFor={value.id}>
                {value.name}
              </label>
            </>
          ))}
        </div>

        <p className="cath_p">Выберите тип кафедры...</p>
        <select
          style={{ marginTop: '0' }}
          className="sel"
          onChange={(e) => setCath({ ...cath, cath_type_id: e.target.value })}
          value={cath.cath_type_id || ''}
        >
          <option value=''></option>
          {cathedra.types.map(el =>
            <option key={el.id} value={el.id}>{el.name}</option>
          )}
        </select>

        <p className="cath_p" >Выберите факультет...</p>
        <select
          style={{ marginTop: '0' }}
          className="sel"
          onChange={(e) => setCath({ ...cath, faculty_id: e.target.value })}
          value={cath.faculty_id || ''}
        >
          <option value=''></option>
          {cathedra.faculties.map(el =>
            <option key={el.id} value={el.id}>{el.name}</option>
          )}
        </select>


      </div>

      <div style={{ marginTop: "5rem" }}>
        <Button variant="dark" onClick={() => setVisible(false)}>
          Отменить
        </Button>
        <Button
          onClick={updateCathFunc}
          style={{ marginLeft: "5px" }}
          variant="primary"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
})

export default EditCathedrasModal;