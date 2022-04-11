import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Context } from "..";
import { fetchCathedras } from "../http/CathedraApi";
import { findUsers } from "../http/UserApi";
import FindUser from "./FindUser";

const Filter = observer( () => {

    const { cathedra } = useContext(Context);
    const { user } = useContext(Context);

    const [cathVal, setCathVal] = useState('');
    const [cathId, setCathId] = useState(0);
    const [type, setType] = useState('');

    useEffect(() => {
        fetchCathedras().then((data) => {
            cathedra.setCathedras(data);
           })
    }, [])

    useEffect(() => {
       if(cathVal) {
        cathedra.cathedras.forEach(cath => {
            if(cath.name === cathVal) {
                setCathId(cath.id)
            }
        })
       }
    }, [cathVal])

    useEffect(() => {
        if(cathId && type === 'Индивидуальный отчёт') {
            findUsers(cathId).then(data => {
                user.setUsers(data);
            })
        }
    }, [cathId, type])


    let types;

    if (type === 'Индивидуальный отчёт' && cathVal) {
        types = (
            <FindUser/>
        )
    }

    return(
        <div className="filter" style={{ marginTop: "4rem" }}>
           <Row>
               <Col style={{fontFamily: 'Roboto'}} md={4}>
               Выберите тип отчёта:
               </Col>
               <Col md={8} >
               <select value={type} onChange={(e) => setType(e.target.value)} className="select">
                   <option value=""></option>
                   <option value="Индивидуальный отчёт">Индивидуальный отчёт</option>
                   <option value="Кафедральный отчёт">Кафедральный отчёт</option>
                   <option value="Рейтинг">Рейтинг</option>
               </select>
               </Col>
           </Row>

           <Row style={{marginTop: '1rem'}} >
               <Col style={{fontFamily: 'Roboto'}} md={4}>
               Выберите кафедру:
               </Col>
               <Col md={8} >
               <select onChange={(e) => setCathVal(e.target.value)} value={cathVal} className="select">
                   <option value=""></option>
                  {cathedra.cathedras.map(cath =>
                    <option key={cath.id} value={cath.name}>
                        {cath.name}
                    </option>
                    )}
               </select>
               </Col>
           </Row>

           {types}
        </div>
    );
})

export default Filter;