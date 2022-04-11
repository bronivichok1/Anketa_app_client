import { observer } from "mobx-react-lite";
import { useContext, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import edit from './../imgs/edit_icon.svg'


const FindUser = observer( () => {

    const navigate = useNavigate();

    const { user } = useContext(Context);
    const [value, setValue] = useState('');

    const filteredUsers = useMemo(() => {
        return user.users.filter(us => {
            return us.fullname.toLowerCase().includes(value.toLowerCase());
    })
    })

    return(
        <div>
           <h4 style={{textAlign: 'center', marginTop: '3rem', marginBottom: '2rem'}} >Сотрудники</h4>

        {user.users && user.users.length
        ? <Row>
            <Col md={4}>
            <input placeholder="Поиск сотрудников..." className="search" value={value} onChange={(e) => setValue(e.target.value)} type="text" />
            </Col>
            <Col md={8} ></Col>
        </Row>
        : <></>
        }

          {
              user.users && user.users.length
              ?  filteredUsers.map(us =>
                <Row className="us_item" key={us.id} >
                    <Col md={11}>
                    {us.fullname}
                    </Col>
                    <Col onClick={() => navigate(`/reports/${us.id}`)} md={1}>
                    <img className="edit" src={edit} alt="" />
                    </Col>
                </Row>
                )
              : <div>Сотрудники не найдены!</div>
          }
        </div>
    );
})

export default FindUser;