import { observer } from "mobx-react-lite";
import { useState, useContext, useEffect } from "react";
import { toJS } from "mobx";
import { Context } from "../index";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import InpComp from "./InpComp";


const ListItem = observer(({ itemm, data1, setData1}) => {
 
  const mobile = useMediaQuery({ query: '(max-width: 770px)' })

  const [clasNum, setClasNum] = useState([]);

  const [sym, setSym] = useState('');
  const [list, setList] = useState('');
  const [yesOrNo, setYesOrNo] = useState('');
  const [vvod, setVvod] = useState('');

  const [boolInp, setBoolInp] = useState(false);

  const [massivTest, setMassivTest] = useState([]);
  const [massivCount, setMassivCount] = useState(1);
  const [massId, setMassId] = useState('');
  const [massivRes, setMassivRes] = useState(0);

  const [symNum, setSymNum] = useState('');

  console.log(data1);


  useEffect( () => {
   
    data1.map( dat => {
      if (dat.type === 'Сумма' && dat.children) {
          data1.map( d => {
            for (let i = 0; i < dat.children.length; i++) {
            if (dat.children[i].num == d.num) {
               dat.children[i].result = d.result;
               
            }
           
          }
         })
          countRes(dat);
      }
    })}, [list, yesOrNo, vvod, massivRes])


    function countRes(dat) {
      let resSym = 0;
        for (let i = 0; i < dat.children.length; i++) {
            resSym += Number(dat.children[i].result ? dat.children[i].result : 0);
          }
        dat.result = resSym;
        setSym(resSym);
    }

  function massivFunc(e, id) {
    setMassId(id)
    setBoolInp(true);
    if (boolInp) {
      setMassivTest([
        ...massivTest.map((mas) =>
        mas.id === massivCount ? {...mas, value: e.target.value} : {...mas}
        )
      ])
      return
    }
    setMassivTest([...massivTest, {id: massivCount, value: e.target.value}]);
  }



  useEffect( () => {
    let r = 0;

    massivTest.map( t => {
      r += Number(t.value);
    })

    setData1([
      ...data1.map((d) =>
      d.id === massId ? {...d, result: r} : {...d}
      )
    ])
    setMassivRes(r);

  }, [massivTest])

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

  function resultFunc(e , id, type) {
    setData1([
      ...data1.map((d) =>
      d.id === id ? {...d, result: e.target.value} : {...d}
      )
    ])
    if (type === 'Список') {
      setList(e.target.value);
    } else if (type === 'Ввод данных') {
      setVvod(e.target.value);
    } else if (type === 'Да/Нет') {
      setYesOrNo(e.target.value);
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
          <ListItem setData1={setData1} data1={data1} itemm={i} key={i.id} />
        ))}
      </ul>
    );
  }


  let types = null;
  if (itemm.type == "Сумма") {
    types = (
      <>
        <Row >
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
            {
              data1.map(dat => {
                if (dat.id === itemm.id) {
                  return dat.result;
                }
              })
            }
            
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
          <select onChange={(e) => resultFunc(e, itemm.id, itemm.type)}>
          <option value=""></option>
          <option value="100">привет</option>
          <option value="50">тест</option>
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
          {list}
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
          <input value={vvod} onChange={(e) => resultFunc(e, itemm.id, itemm.type)} type="text" />
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
          <input onChange={(e) => resultFunc(e, itemm.id, itemm.type)} name={itemm.num} style={
            mobile
            ? {width: '10%'}
            : {width: '3%'}
          } type="radio" id="yes" value="101" />
          <label htmlFor="yes">Да</label>

          <input onChange={(e) => resultFunc(e, itemm.id, itemm.type)} name={itemm.num} style={
            mobile
            ? {width: '10%'}
            : {width: '3%'}
          } type="radio" id="no" value="51" />
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
          {
            yesOrNo
          }
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
       <input type="number" onChange={(e) => massivFunc(e, itemm.id)} />
       </div>
       <InpComp massivCount={massivCount} massivTest={massivTest} setMassivTest={setMassivTest} bool={boolInp} />
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
          {massivRes
          ? massivRes
          : <></>
        }
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
          onClick={() => {
            fun(itemm.id);
          }}
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
          onClick={() => {
            fun(itemm.id);
          }}
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
