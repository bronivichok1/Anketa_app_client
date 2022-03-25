import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { useMediaQuery } from 'react-responsive';
import Items from "./Items";
import { createTree2 } from "../functions";

const Blank = observer( () => {
  const { item } = useContext(Context);

  const [data, setData] = useState([]);

  const mobile = useMediaQuery({ query: '(max-width: 1400px)' })
  const mobile2 = useMediaQuery({ query: '(max-width: 410px)' })


  useEffect( () => {
    setData(createTree2([...item.items.map(d => d.parentId === null ? {...d, clas: true, clasName: false} : 
      d.children && d.children.length 
      ?  {...d, clas: false, clasName: false}
      :  {...d, clas: false}
     )]));
  }, [])

  const showFunc = async (id) => {
    setData([...data.map(d => d.parentId === id 
      ? {...d, clas: !d.clas}
      :  d.id === id && d.children && d.children.length
      ? {...d, clasName: !d.clasName}
      : {...d}
      )]);
  }

  console.log(data);


  return (
    
      <div  className="blank" style={{ marginTop: "4rem" }}>
      <Row style={{ backgroundColor: "#e9eff9", borderRadius: '15px'}}>
        <Col style={{ textAlign: "center" }}>Ставка:</Col>
        <Col style={{ textAlign: "center" }}>Общий балл: {item.sym ? item.sym : ''} </Col>
      </Row>
      <Row className="row" style={{ marginTop: "1rem" }}>
        <Col md={6}>ФИО</Col>
        <Col md={6}>
          <input type="text" />
        </Col>
      </Row>
      <Row className="row" style={{ marginTop: "1rem" }}>
        <Col md={6}>Кафедра</Col>
        <Col md={6}>
          <select>
            <option value=""></option>
            <option value="ghgj">hhjhljljl</option>
          </select>
        </Col>
      </Row>
      <div
        style={{ marginTop: "2rem", marginBottom: "0.5rem" }}
        className="hr"
      ></div>
      
        <Row>
          <Col style={{ textAlign: "center" }} md={8} >
          Критерии
          </Col>
          <Col style={{ textAlign: "center" }} md={1} >
          Балл
          </Col>
          <Col style={{ textAlign: "center" }} md={2}>
          Значение
          </Col>
          <Col md={1} ></Col>
        </Row>
       
      <div style={{ marginTop: "0.5rem", marginBottom: '2rem' }} className="hr"></div>

      <Items showFunc={showFunc} data={data} setData={setData} />

      
       <Row style={{marginTop: '3rem'}}>
          <Col lg={6}></Col>
          <Col lg={6}>
          <Button style={
            mobile
            ? {fontFamily: "var(--bs-body-font-family)", fontWeight: '500', marginTop: '15px'}
            : {fontFamily: "var(--bs-body-font-family)", fontWeight: '500', marginLeft: '35%', marginTop: '15px'}
          } variant="dark">
            Сброс данных анкеты
          </Button>
          <Button  style={
            mobile2
            ? {fontFamily: "var(--bs-body-font-family)", fontWeight: '500', marginTop: '15px'}
            : {fontFamily: "var(--bs-body-font-family)", fontWeight: '500', marginLeft: '10px', marginTop: '15px'}
          } variant="primary">
            Сохранить анкету
          </Button>
          </Col>
       </Row>
      
    </div>
   
  );
});

export default Blank;
