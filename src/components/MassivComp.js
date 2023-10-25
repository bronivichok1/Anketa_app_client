import React, { useContext, useState } from 'react'
import { Button, Col } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Context } from '..';
import del from "./../imgs/delete.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const MassivComp = ({ d, test, type, massivv, setMassivv, deleted, setDeleted }) => {

  const mobile = useMediaQuery({ query: "(max-width: 770px)" });

  const { item } = useContext(Context);
  const { book } = useContext(Context);
  const { massiv } = useContext(Context);

  const [massId, setMassId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  async function autocompleteItemHandler(book, id, massFormula, massBall) {
    await item[setMassivv](
      item[massivv].hasOwnProperty(id)
        ? {
          ...item[massivv],
          [id]: item[massivv][id].find(el => el.id === book.id) ? [...item[massivv][id]] : [...item[massivv][id], { id: book.id, val: book.colvo_authors, name: book.name }]
        }
        : { ...item[massivv], [id]: [{ id: book.id, val: book.colvo_authors, name: book.name }] }
    );
    setIsOpen(!isOpen);
    countResMassiv(id, massFormula, massBall);
  }

  async function deleteMassivFunc(idMas, idEl, formula, ball) {
    await item[setMassivv]({
      ...item[massivv],
      [idMas]: [...item[massivv][idMas].filter((el) => el.id !== idEl)],
    });
    massiv[setDeleted]([...massiv[deleted], idEl]);
    countResMassiv(idMas, formula, ball);
  }


  async function countResMassiv(id, formula, ball) {
    let res = 0;
    if (item[massivv].hasOwnProperty(id) && item[massivv][id]) {
      await item[massivv][id].map((el) => {
        res += formula
          ? eval(formula.replace(/Балл/gi, ball).replace(/Ввод/gi, el.val))
          : 0;
        console.log(formula);
      });

      await item.setItems([
        ...item.items.map((dat) =>
          dat.id === id ? { ...dat, value: Number(res.toFixed(2)) } : { ...dat }
        ),
      ]);

      test();
    }
  }


  return (
    <Col
      style={{
        borderBottom: mobile ? "" : "1px solid #d1d1d1",
        borderRight: mobile ? "" : "1px solid #d1d1d1",
      }}
      md={2}
      hidden={type === 'create' ? (d.clas ? false : true) : false}
    >
      <div className="mas_input" >

        <div style={{ display: 'flex', justifyContent: 'center' }} >
          <Button
            className='buttonClass'
            style={{ margin: '8px 0' }}
            variant="primary"
            onClick={() => {
              setIsOpen(!isOpen);
              setMassId(d.id);
            }}
          >
            Добавить
          </Button>
        </div>

        <ul className="autocomplete" style={{width: mobile ? "100%" : "230%", marginLeft: mobile ? "0%" : "-65%"}}>
          {isOpen && massId === d.id ? <div className="divCross" ><img onClick={() => setIsOpen(!isOpen)} className='cross' src={del} alt="" /></div> : ''}
          {isOpen
            ? book.books.map((b) => {
              if (b.item_id === massId && massId === d.id) {
                return (
                  <li
                    onClick={() => autocompleteItemHandler(b, d.id, d.formula, d.ball)}
                    key={b.id}
                    className="autocomplete_item"
                  >
                    {b.name}
                  </li>
                );
              }
            })
            : null}
        </ul>
      </div>

      {item[massivv].hasOwnProperty(`${d.id}`) &&
        item[massivv][`${d.id}`] &&
        item[massivv][`${d.id}`].length ? (
        item[massivv][`${d.id}`].map((dat) => (
          <div key={dat.id} style={{ display: "flex" }}>
            <Tippy content={dat.name}>
              <div className="mas_val">
                {dat.val}
              </div>
            </Tippy>
            <img
              alt=""
              src={del}
              className="mas_del"
              onClick={() => {
                deleteMassivFunc(d.id, dat.id, d.formula, d.ball);
              }}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </Col>
  )
}

export default MassivComp