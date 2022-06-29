import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Context } from "..";

const SelectComp = ({d, test, type}) => {

    const mobile = useMediaQuery({ query: "(max-width: 770px)" });

    const { item } = useContext(Context);

    const [select, setSelect] = useState(0);
    const [selectId, setSelectId] = useState(0);


    async function selectFunc(id) {
          const ball = await item.selects.find(
            (sel) => sel.itemId === id && sel.name === select
          ).ball;
    
          await item.setItems([
            ...item.items.map((dat) =>
              dat.id === id ? { ...dat, value: Number(ball) } : { ...dat }
            ),
          ]);
    
       test();
      }
    
      useEffect(() => {
       if (select) {
        selectFunc(selectId);
       }
      }, [select, selectId]);

  return (
    <Col
      style={{
        borderBottom: mobile ? "" : "1px solid #d1d1d1",
        borderRight: mobile ? "" : "1px solid #d1d1d1",
      }}
      md={2}
      hidden={type === 'create' ? (d.clas ? false : true) : false}
    >
      <select
        value={d.select || ""}
        onChange={(e) => {
          setSelect(e.target.value);
          setSelectId(d.id);
          item.setItems([
            ...item.items.map((dat) =>
              dat.id === d.id
                ? {
                    ...dat,
                    select: e.target.value,
                  }
                : { ...dat }
            ),
          ]);

          if (d.name.trim() === "Количество занимаемых ставок") {
            item.setStavka(e.target.value);
          }
        }}
        style={{ marginTop: "0.5rem" }}
      >
        <option value=""></option>

        {item.selects.map((sel) => {
          if (sel.itemId === d.id) {
            return (
              <option key={sel.id} value={sel.name}>
                {sel.name}
              </option>
            );
          }
        })}
      </select>
    </Col>
  );
};

export default SelectComp;
