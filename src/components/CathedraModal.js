import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { createCathedra } from "../http/CathedraApi";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const CathedrasModal = observer( ({ setVisible }) => {
    const {cathedra} = useContext(Context);

  const mobile = useMediaQuery({ query: "(max-width: 900px)" });

    const [name, setName] = useState('');
    const [clin_or_teor, setClin_or_teor] = useState('');
    const [faculty_id, setFaculty_id] = useState(0);
    const [cath_type_id, setCath_type_id] = useState(0);


  const createCathFunc = () => {

    if(name && clin_or_teor && faculty_id && cath_type_id) {
        createCathedra({name, clin_or_teor, faculty_id, cath_type_id}).then(data => {
            window.location.reload();
        })
    } else {
        alert('Название, значение, тип и факультет кафедры не могут быть пустыми!');
    }
  };


  return (
    <div >
      <h3 style={{textAlign: 'center', marginTop: '2rem'}} >
        Добавить кафедру
      </h3>
      <div className="cath_modal">
        <textarea
          style={mobile ? {} : {minWidth: '800px'}}
          onChange={(e) => setName(e.target.value)}
          value={name}
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
                  clin_or_teor === "Клиническая"
                    ? true
                    : false
                }
                onChange={(e) => {
                 setClin_or_teor(e.target.value)
                }}
                name='Клиническая'
                type="radio"
                id={name}
                value='Клиническая'
                className="yes_no"
              />
              <label className="yes_no" htmlFor={name}>
              Клиническая
              </label>

              <input
              style={{marginRight: '5px', marginLeft: '10px'}}
                checked={
                    clin_or_teor === "Теоритическая"
                    ? true
                    : false
                }
                className="yes_no"
                onChange={(e) => {
                    setClin_or_teor(e.target.value)
                }}
                name='Теоритическая'
                type="radio"
                id={cath_type_id}
                value="Теоритическая"
              />
              <label className="yes_no" htmlFor={cath_type_id}>
              Теоритическая
              </label>
        </div>

                <p className="cath_p">Выберите тип кафедры...</p>
        <select
        style={{marginTop: '0'}}
          className="sel"
          onChange={(e) => setCath_type_id(e.target.value)}
        value={
          cath_type_id
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
          onChange={(e) => setFaculty_id(e.target.value)}
          value={faculty_id}
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
          onClick={createCathFunc}
          style={{ marginLeft: "5px" }}
          variant="primary"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
})

export default CathedrasModal;