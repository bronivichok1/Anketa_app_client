import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { toJS } from "mobx";
import { Context } from "../index";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import InpComp from "./InpComp";


const ListItem = observer(({ itemm }) => {
 
  const mobile = useMediaQuery({ query: '(max-width: 770px)' })

  const [clasNum, setClasNum] = useState([]);

  const [sym, setSym] = useState([]);
  const [list, setList] = useState('');
  const [yesOrNo, setYesOrNo] = useState('');
  const [vvod, setVvod] = useState('');
  const [massiv, setMassiv] = useState(0);

  const [boolInp, setBoolInp] = useState(false);

  const [massivSym, setMassivSym] = useState(0);

  useEffect( () => {
    setMassivSym(Number(massiv));
  }, [massiv])


  function massivFunc(e) {
    setBoolInp(true);
    setMassiv(e.target.value);
  }

  //console.log(massivSym);

  function fun(id) {
    if (clasNum && clasNum.includes(id)) {
      setClasNum([...clasNum.filter((i) => i != id)]);
      return;
    }
    setClasNum([...clasNum, id]);
  }

  function treeClick(e) {
    if (e.target.tagName != "SPAN") return;

    let childCont = e.target.parentNode.querySelector("ul");

    if (!childCont) {
      return;
    } else {
      childCont.hidden = !childCont.hidden;
    }
  }



  let childrenn = null;
  if (itemm.children && itemm.children.length) {
    childrenn = (
      <ul
        style={
          itemm.id == "id"
            ? { marginLeft: "-16px" }
            : { fontFamily: "var(--bs-body-font-family)" }
        }
        hidden={itemm.id == "id" ? false : true}
        onClick={(e) => treeClick(e)}
      >
        {itemm.children.map((i) => (
          <ListItem itemm={i} key={i.id} />
        ))}
      </ul>
    );
  }


  let types = null;
  if (itemm.type == "Сумма") {
    types = (
      <>
        <Row>
          <Col
            xs={
              itemm.help
              ? mobile ? 10 : 11
              : 12
            }
            style={{
              textAlign: "center",
              backgroundColor: "rgb(233, 239, 249)",
              borderRadius: '15px',
              fontFamily:
                '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
            }}
          >
            8
          </Col>
          {itemm.help ? <Col style={{textAlign: 'center', cursor: 'pointer'}} xs={
            mobile
            ? 2
            : 1
          }>
            <Tippy content={itemm.help}>
            <div className="ques">?</div>
            </Tippy>
            </Col> : <></>}
        </Row>
        <div style={{marginTop: '1rem'}} className="hr2"></div>
      </>
    );
  } else if (itemm.type == "Список") {
    types = (
      <>
        <Row style={{alignItems: 'center'}}>
          <Col xs={
            mobile && itemm.help
            ? 8
            : 9
          }>
          <select onChange={(e) => setList(e.target.value)}>
          <option value=""></option>
          <option value="привет">привет</option>
          <option value="тест">тест</option>
        </select>
          </Col>
          <Col xs={
            itemm.help 
            ? 2
            : 3
          }  style={{
            textAlign: "center",
            backgroundColor: "rgb(233, 239, 249)",
            fontFamily:
              '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
            marginTop: "0.5rem",
            borderRadius: '15px',
          }}>
          4
          </Col>
          {itemm.help ? <Col style={{textAlign: 'center', cursor: 'pointer'}} xs={
            mobile
            ? 2
            : 1
          }>
          <Tippy content={itemm.help}>
            <div className="ques">?</div>
            </Tippy>
          </Col> : <></>}
        </Row>
        <div style={{marginTop: '1rem'}} className="hr2"></div>
      </>
    );
  } else if (itemm.type == "Ввод данных") {
    types = (
      <>
        <Row>
          <Col xs={
            mobile && itemm.help
            ? 8
            : 9
          }>
          <input value={vvod} onChange={(e) => setVvod(e.target.value)} type="text" />
          </Col>
          <Col xs={
            itemm.help
            ? 2
            : 3
          } style={{
            textAlign: "center",
            backgroundColor: "rgb(233, 239, 249)",
            fontFamily:
              '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
            marginTop: "0.5rem",  borderRadius: '15px',}}>
         {vvod}
          </Col>
          {itemm.help ? <Col style={{textAlign: 'center', cursor: 'pointer'}} xs={
            mobile
            ? 2
            : 1
          }>
          <Tippy content={itemm.help}>
            <div className="ques">?</div>
            </Tippy>
          </Col> : <></>}
        </Row>
        <div style={{marginTop: '1rem'}} className="hr2"></div>
      </>
    );
  } else if (itemm.type == "Да/Нет") {
    types = (
      <>
        <Row style={{alignItems: 'center'}}>
          <Col xs={
            mobile && itemm.help
            ? 8
            : 9
          } >
          <div style={{
            textAlign: "center",
            border: "2px solid #0b5ed7",
            borderRadius: "15px",
            height: '38px'
          }}>
          <input onChange={(e) => setYesOrNo(e.target.value)} name={itemm.num} style={
            mobile
            ? {width: '10%'}
            : {width: '3%'}
          } type="radio" id="yes" value="yes" />
          <label htmlFor="yes">Да</label>

          <input onChange={(e) => setYesOrNo(e.target.value)} name={itemm.num} style={
            mobile
            ? {width: '10%'}
            : {width: '3%'}
          } type="radio" id="no" value="no" />
          <label htmlFor="no">Нет</label>
          </div>
          </Col>
          <Col xs={
            itemm.help
            ? 2
            : 3
          } style={{
            textAlign: "center",
            backgroundColor: "rgb(233, 239, 249)",
            fontFamily:
              '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
            marginTop: "0.5rem",  borderRadius: '15px',
          }}>
          0
          </Col>
          {itemm.help ? <Col style={{textAlign: 'center', cursor: 'pointer'}} xs={
            mobile
            ? 2
            : 1
          }>
         <Tippy content={itemm.help}>
            <div className="ques">?</div>
            </Tippy>
          </Col> : <></>}
        </Row>
        <div style={{marginTop: '1rem'}} className="hr2"></div>
      </>
    );
  } else if (itemm.type == "Массив данных") {
    types = (
      <>
        <Row style={{alignItems: 'center'}}>
          <Col xs={
            mobile && itemm.help
            ? 8
            : 9
          }>
         <div>
       <input type="number" onChange={(e) => massivFunc(e)} />
       </div>
       <InpComp setMassivSym={setMassivSym} massivSym={massivSym} bool={boolInp} setBool={setBoolInp} />
          </Col>
          <Col xs={
            itemm.help
            ? 2
            : 3
          } style={{
            textAlign: "center",
            backgroundColor: "rgb(233, 239, 249)",
            fontFamily:
              '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
            marginTop: "0.5rem",  borderRadius: '15px',
          }}>
          0
          </Col>
          {itemm.help ? <Col style={{textAlign: 'center', cursor: 'pointer'}} xs={
            mobile
            ? 2
            : 1
          }>
          <Tippy content={itemm.help}>
            <div className="ques">?</div>
            </Tippy>
          </Col> : <></>}
        </Row>
        <div style={{marginTop: '1rem'}} className="hr2"></div>
      </>
    );
  }

  let items = null;
  if (itemm.id == "id") {
    items = (
      <>
        {itemm.num} {itemm.name} {childrenn}
      </>
    );
  } else if (itemm.num && itemm.num.includes("0")) {
    items = (
      <>
        <span
          onClick={() => fun(itemm.id)}
          className={
            childrenn ? (clasNum.includes(itemm.id) ? "showw" : "hide") : ""
          }
        >
          {itemm.name}{" "}
        </span>{" "}
        {types}
        {childrenn}
      </>
    );
  } else {
    items = (
      <>
        <span
          onClick={() => fun(itemm.id)}
          className={
            childrenn ? (clasNum.includes(itemm.id) ? "showw" : "hide") : ""
          }
        >
          {itemm.num}. {itemm.name}{" "}
        </span>{" "}
        {types}
        {childrenn}
      </>
    );
  }

  return (
    <>
    
    <li style={{marginBottom: '0.8rem'}}
      onClick={(e) => treeClick(e)}
      className={
        itemm.id == "id" || (itemm.num && itemm.num.includes("0"))
          ? "hideLi"
          : "li"
      }
    >
      {items}
    </li>
    </>
  );
});

export default ListItem;
