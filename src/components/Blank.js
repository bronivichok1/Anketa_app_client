import { observer } from "mobx-react-lite";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import ListItem from "./ListItem";
import { toJS} from 'mobx';
import { useMediaQuery } from 'react-responsive';

const Blank = observer( () => {
  const { item } = useContext(Context);

  const [data, setData] = useState([]);

  const [tree, setTree] = useState([]);
  const [obj, setObj] = useState({});

  const mobile = useMediaQuery({ query: '(max-width: 1400px)' })

  const mobile2 = useMediaQuery({ query: '(max-width: 410px)' })

  
  function createTree(arr) {
    if (!arr || !arr.length) { return []; }
    var tree = [], map = new Map();
    for (var i = 0, len = arr.length; i < len; ++i) {
      var item = arr[i];
      var mapItem = map.get(item.id);
      if (!mapItem || Array.isArray(mapItem)) {
        if (mapItem) {
          item.children = mapItem;
        }
        map.set(item.id, item);
      }
      if (item.parentId == null) {
        tree.push(item);
      } else {
        var parentItem = map.get(item.parentId);
        if (!parentItem) {
          map.set(item.parentId, [item]);
        } else {
          var children = Array.isArray(parentItem) ?
            parentItem :
            (parentItem.children = parentItem.children || []);
          children.push(item);
        }
      }
    }
    return tree;
  }
  

  function sortTree(arr) {
    if (arr && arr.length) {

    arr.sort((a, b) => Number(a.num.split('.')[ a.num.split('.').length - 1]) > Number(b.num.split('.')[ b.num.split('.').length - 1]) ? 1 : -1);
    arr.map( ar => {
      sortTree(ar.children);
    })
    }
    return arr;
  }


  useEffect( () => {
    setData(toJS(item.items));
  }, []);


  useEffect( () => {
    setTree( createTree(data));
  }, [data]);

  useEffect( () => {
    setObj({
      id: 'id', name: '', num: '',
      children : tree
    })
  }, [tree]);

  sortTree(obj.children);

  // useEffect(() => {
  //   sortTree(obj.children);
  // }, [obj])


  return (
    
      <Container  className="blank" style={{ marginTop: "4rem" }}>
      <Row style={{ backgroundColor: "#e9eff9", borderRadius: '15px'}}>
        <Col style={{ textAlign: "center" }}>Ставка:</Col>
        <Col style={{ textAlign: "center" }}>Общий балл:</Col>
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
      
      <div style={{ textAlign: "center" }}>
      Критерии
      </div>
      <div style={{ textAlign: "center" }} >
      Значение
        </div>
        <div style={{ textAlign: "center" }} >
          Балл
        </div>
       
      <div style={{ marginTop: "0.5rem", marginBottom: '2rem' }} className="hr"></div>

      <ListItem itemm={obj} />

      
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
      
    </Container>
   
  );
});

export default Blank;
