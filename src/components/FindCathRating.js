import axios from "axios";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Context } from "..";
import { saveAs } from "file-saver";

const FindCathRating = observer(({ cathId }) => {
  const { rating } = useContext(Context);


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

      <div className="big-table">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Фамилия</th>
              <th>Ставки</th>
              <th>Учебная деят.</th>
              <th>Учебно-мет.деят</th>
              <th>Науч.-исслед.</th>
              <th>Воспит. работа</th>
              <th>Лечебн-диагн.</th>
              <th>Международная работа</th>
              <th>Индекс Хирша</th>
              <th>Индекс Хирша (SCOPUS)</th>
              <th>Кол-во статей (SCOPUS)</th>
              <th>Кол-во статей (Web of Science)</th>
              <th>Работа по COVID-19</th>
              <th>Должность</th>
              <th>Степень</th>
              <th>Возраст</th>
            </tr>
          </thead>
          <tbody>
            {rating.rating && rating.rating.length ? (
              rating.rating.map((rat) => (
                <tr key={rat.id}>
                  <td>{rat.id ? rat.id : ''}</td>
                  <td>{rat.fullname}</td>
                  <td>{rat.stavka}</td>
                  <td>{rat.uchWork}</td>
                  <td>{rat.uchMetWork}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{rat.dolj}</td>
                  <td>{rat.stepen}</td>
                  <td>{rat.age}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
        
      </div>

      <Button style={{marginTop: '2rem'}} onClick={createExcel} variant="primary" >Вывод в эксель</Button>
    </div>
  );
});

export default FindCathRating;
