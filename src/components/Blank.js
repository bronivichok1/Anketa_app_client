import { observer } from "mobx-react-lite";
import { Row, Col, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { useMediaQuery } from 'react-responsive';
import Items from "./Items";
import { createTree2 } from "../functions";
import { fetchItems } from "../http/ItemApi";
import { fetchSelectsAll } from "../http/SelectApi";
//import Lib from "./Lib";

const Blank = observer( () => {
  const { item } = useContext(Context);

  const [data, setData] = useState([]);

  const mobile = useMediaQuery({ query: '(max-width: 1400px)' })
  const mobile2 = useMediaQuery({ query: '(max-width: 410px)' })

  const [child, setChild] = useState('');
  const [parent, setParent] = useState('');

  const [name, setName] = useState('');


  useEffect( () => {

    if(localStorage.getItem('data')) {
      setData(JSON.parse(localStorage.getItem('data')));
    } else {
      fetchItems().then((data) => {
        setData(createTree2([...data.map(d => d.parentId === null ? {...d, clas: true, clasName: false} : 
          d.children && d.children.length 
          ?  {...d, clas: false, clasName: false}
          :  {...d, clas: false}
         )]))
      })
    }

    if(localStorage.getItem('massiv')) {
      item.setMassiv(JSON.parse(localStorage.getItem('massiv')));
    }

     setName(localStorage.getItem('name'));
     fetchSelectsAll().then((data) => {
       item.setSelects(data);
     })
  }, [])

  const showFunc = async (id) => {
    setData([...data.map(d => d.parentId === id 
      ? {...d, clas: !d.clas}
      :  d.id === id && d.children && d.children.length
      ? {...d, clasName: !d.clasName}
      : {...d}
      )]);
  }

  useEffect( () => {
   data.forEach( el => {
     data.forEach( el2 => {
       if( !el.clas && el2.num.includes(el.num) && el2.num.split('.').length === el.num.split('.').length + 1
       && el2.clas ) {
         setChild(el2.num);
         setParent(el.num);
       }
     })
   })
  }, [data])

  useEffect( () => {
   if(child && parent) {
    setData([
      ...data.map((dat) =>
        dat.num === child ? { ...dat, clas: !dat.clas } : 
        dat.num === parent ? { ...dat, clasName: !dat.clasName } : 
        { ...dat }
      ),
    ]);
   }
  }, [child, parent])


  console.log(data);

  function clearData() {
    
    if( localStorage.getItem('data')) {
      localStorage.removeItem('data');
    }
    if( localStorage.getItem('massiv')) {
      localStorage.removeItem('massiv');
    }
    window.location.reload();
  }

  function saveData() {
   localStorage.setItem('data', JSON.stringify(data));
   localStorage.setItem('massiv', JSON.stringify(item.massiv));
   alert('Ваши данные сохранены!');
  }



  return (
    
      <div  className="blank" style={{ marginTop: "4rem" }}>
      <Row style={{ backgroundColor: "#e9eff9", borderRadius: '15px'}}>
        <Col style={{ textAlign: "center" }}>Ставка: {item.stavka} </Col>
        <Col style={{ textAlign: "center" }}>Общий балл: {item.sym ? Number(item.sym.toFixed(2)) : ''} </Col>
      </Row>
      <Row className="row" style={{ marginTop: "1rem" }}>
        <Col md={6}>ФИО</Col>
        <Col md={6}>
          <input onChange={(e) => setName(e.target.value)} value={name ? name : ''} type="text" />
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
       
      <div style={{ marginTop: "0.5rem"}} className="hr"></div>

      <Items showFunc={showFunc} data={data} setData={setData} />
      {/* <Lib/> */}

      
       <Row style={{marginTop: '3rem'}}>
          <Col lg={6}></Col>
          <Col lg={6}>
          <Button
          onClick={clearData}
           style={
            mobile
            ? {fontFamily: "var(--bs-body-font-family)", fontWeight: '500', marginTop: '15px'}
            : {fontFamily: "var(--bs-body-font-family)", fontWeight: '500', marginLeft: '35%', marginTop: '15px'}
          } variant="dark">
            Сброс данных анкеты
          </Button>
          <Button onClick={saveData} style={
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
