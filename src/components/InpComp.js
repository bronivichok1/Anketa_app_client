import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const InpComp = observer( ({bool, massivTest, setMassivTest, massivCount}) => {
    const [neww, setNeww] = useState(false);
    const [newCount, setNewCount] = useState(0);

    useEffect( () => {
      if (bool) {
        setNewCount(massivCount + 1);
      }
    }, [bool])

    function massivFunc(e) {
        setNeww(true);
        if (neww) {
          setMassivTest([
            ...massivTest.map((mas) =>
            mas.id === newCount ? {...mas, value: e.target.value} : {...mas}
            )
          ])
          return;
        }
        setMassivTest([...massivTest, {id: newCount, value: e.target.value}]);
    }


  let inp = null;
  if (bool) {
    inp = (
     <>
      <input style={{ marginTop: "0.5rem" }} onChange={(e) => massivFunc(e)} type="number" />
      <InpComp massivCount={newCount} massivTest={massivTest} setMassivTest={setMassivTest} bool={neww} />
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