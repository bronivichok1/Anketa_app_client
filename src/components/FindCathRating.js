import axios from "axios";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Context } from "..";
import { saveAs } from "file-saver";
import { fetchTablesTrue } from "../http/RatingTablesApi";

const FindCathRating = observer(({ cathId }) => {
  const { rating } = useContext(Context);
  const { cathedra } = useContext(Context);
  const { user } = useContext(Context);

  useEffect(() => {
    fetchTablesTrue().then(data => {
      rating.setRatingTables(data);
    })
  }, [])

  function createExcel() {
    axios
      .post(process.env.REACT_APP_HOST + "/excel", {arr: rating.rating})
      .then(() =>
        axios.get(process.env.REACT_APP_HOST + "/excelRes", { responseType: "blob" })
      )
      .then((res) => {
        const xlsxBlob = new Blob([res.data], { type: "application/xlsx" });
        saveAs(xlsxBlob, `rating.xlsx`);
      });
  }

  return (
    <div className="wrapp" >
      <h4
        style={{ textAlign: "center", marginTop: "3rem", marginBottom: "3rem" }}
      >
        Рейтинг
      </h4>

    {user.isAuth 
    ?  <>
    <div className="big-table">
    <table>
      <thead>
        <tr>

          {rating.ratingTables.map(el => 
            <th key={el.id} > {el.name} </th>
          )}

        </tr>
      </thead>
      <tbody>
        {rating.rating && rating.rating.length ? (
          rating.rating.map((rat) => (
            <tr key={rat.id}>

              {rating.ratingTables.map(el => 
               <td key={el.id} > {eval(el.formula)} </td>
              )}

            </tr>
          ))
        ) : (
          <></>
        )}
      </tbody>
    </table>
  </div>

  <Button style={{marginTop: '2rem'}} onClick={createExcel} variant="primary" >Вывод в эксель</Button>
    </>
    : <div>У Вас нет доступа!</div>
    }
     
    </div>
  );
});

export default FindCathRating;
