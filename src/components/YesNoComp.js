import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Context } from "..";

const YesNoComp = ({d, test, type}) => {

    const mobile = useMediaQuery({ query: "(max-width: 770px)" });

    const { item } = useContext(Context);

    const [yesNo, setYesNo] = useState(0);
    const [yesNoId, setYesNoId] = useState(0);

    async function yesNoFunc(id) {
        await item.setItems([
          ...item.items.map((dat) =>
            dat.id === id ? { ...dat, value: Number(yesNo) } : { ...dat }
          ),
        ]);
        test();
      }
    
      useEffect(() => {
        if(yesNo) {
          yesNoFunc(yesNoId);
        }
      }, [yesNo, yesNoId]);

  return (
    <Col
      style={{
        borderBottom: mobile ? "" : "1px solid #d1d1d1",
        borderRight: mobile ? "" : "1px solid #d1d1d1",
        textAlign: "center",
      }}
      md={2}
      hidden={type === 'create' ? (d.clas ? false : true) : false}
    >
      <input
        checked={d.value ? true : false}
        onChange={(e) => {
          setYesNo(e.target.value);
          setYesNoId(d.id);
        }}
        name={d.num}
        style={mobile ? { width: "10%" } : { width: "10%" }}
        type="radio"
        id={d.num}
        value={d.ball}
        className="yes_no"
      />
      <label className="yes_no" htmlFor={d.num}>
        Да
      </label>

      <input
        checked={d.value == "0" ? true : false}
        className="yes_no"
        onChange={(e) => {
          setYesNo(e.target.value);
          setYesNoId(d.id);
        }}
        name={d.num}
        style={mobile ? { width: "10%" } : { width: "10%" }}
        type="radio"
        id={d.name}
        value="0"
      />
      <label className="yes_no" htmlFor={d.name}>
        Нет
      </label>
    </Col>
  );
};

export default YesNoComp;
