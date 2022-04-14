import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { updateCathedra } from "../http/CathedraApi";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const EditCathedrasModal = observer( ({ setVisible, setCath, cath }) => {
    const {cathedra} = useContext(Context);

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
      <h3 style={{textAlign: 'center', marginTop: '2rem'}} >
        Редактировать кафедру
      </h3>
      <div className="cath_modal">
        <textarea
          style={mobile ? {} : {minWidth: '800px'}}
          onChange={(e) => setCath({ ...cath, name: e.target.value })}
          value={cath.name || ""}
          type="text"
          placeholder="Введите название кафедры..."
          className="text_edit"
        />

        <div
        style={{fontWeight: 'bold'}}
        >
        <input
                style={{marginRight: '5px', marginLeft: '10px'}}
                checked={
                  cath.clin_or_teor === "Клиническая"
                    ? true
                    : false
                }
                onChange={(e) => {
                 setCath({...cath, clin_or_teor: e.target.value})
                }}
                name='Клиническая'
                type="radio"
                id={cath.id}
                value='Клиническая'
                className="yes_no"
              />
              <label className="yes_no" htmlFor={cath.id}>
              Клиническая
              </label>

              <input
              style={{marginRight: '5px', marginLeft: '10px'}}
                checked={
                    cath.clin_or_teor === "Теоритическая"
                    ? true
                    : false
                }
                className="yes_no"
                onChange={(e) => {
                    setCath({...cath, clin_or_teor: e.target.value})
                }}
                name='Теоритическая'
                type="radio"
                id={cath.name}
                value="Теоритическая"
              />
              <label className="yes_no" htmlFor={cath.name}>
              Теоритическая
              </label>
        </div>

                <p className="cath_p">Выберите тип кафедры...</p>
        <select
        style={{marginTop: '0'}}
          className="sel"
          onChange={(e) => setCath({...cath, cath_type_id: e.target.value})}
        value={
           cath.cath_type_id || ''
        }
        >
             <option value=''></option>
         {cathedra.types.map(el => 
             <option key={el.id} value={el.id}>{el.name}</option>
         )}
        </select>

            <p className="cath_p" >Выберите факультет...</p>
        <select
        style={{marginTop: '0'}}
          className="sel"
          onChange={(e) => setCath({...cath, faculty_id: e.target.value})}
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