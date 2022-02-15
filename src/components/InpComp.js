import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const InpComp = observer( ({bool, setBool, setMassivSym, massivSym}) => {
    const [neww, setNeww] = useState(false);
    const [massiv, setMassiv] = useState(0);

    function massivFunc(e) {
        setNeww(true);
        setMassiv(e.target.value);
    }
    
    useEffect( () => {
        setMassivSym(Number(massivSym) + Number(massiv));
    }, [bool])
    console.log(massivSym);

  let inp = null;
  if (bool) {
    inp = (
     <>
      <input style={{ marginTop: "0.5rem" }} onChange={(e) => massivFunc(e)} type="number" />
      <InpComp setMassivSym={setMassivSym} massivSym={massivSym} bool={neww} setBool={setNeww} />
     </>
    )
  }


  return(
      <>
       {inp}
      </>
  );

})

export default InpComp;