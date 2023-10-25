import React, { useContext, useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive';
import { Context } from '..';

const VvodComp = ({d, test, type}) => {

   const mobile = useMediaQuery({ query: "(max-width: 770px)" });

   const [vvod, setVvod] = useState(-1);
   const [vvodId, setVvodId] = useState(0);
   const { item } = useContext(Context);

   async function vvodFunc(id) {
    await item.setItems([
      ...item.items.map((dat) =>
        dat.id === id
          ? {
              ...dat,
              value: vvod
                ? eval(
                    dat.formula.replace("Балл", dat.ball).replace("Ввод", vvod)
                  )
                : 0,
            }
          : { ...dat }
      ),
    ]);
    test();
  }

  useEffect(() => {
   if(Number(vvod) >= 0) {
    vvodFunc(vvodId);
   }
  }, [vvod, vvodId]);


  return (
    <Col
    style={{
      borderBottom: mobile ? "" : "1px solid #d1d1d1",
      borderRight: mobile ? "" : "1px solid #d1d1d1",
    }}
    md={2}
    hidden={type === 'create' ? (d.clas ? false : true) : false}
    >
    <input
      value={
        d.vvod
          ? d.vvod
          : ''
      }
      style={{ marginTop: "0.5rem" }}
      onChange={(e) => {
        setVvod(Number(e.target.value) > 0 ? e.target.value : 0);
        setVvodId(d.id);
        item.setItems([
          ...item.items.map((dat) =>
            dat.id === d.id
              ? { ...dat, vvod: Number(e.target.value) > 0 ? e.target.value : 0 }
              : { ...dat }
          ),
        ]);
      }}
      type="number"
    />
  </Col>
  )
}

export default VvodComp