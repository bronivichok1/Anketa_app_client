import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';

const Footer = observer( () => {

    const [year, setYear] = useState(2022);

    useEffect( () => {
        const today = new Date();
        setYear(today.getFullYear());
    }, [])

    const mobile = useMediaQuery({ query: '(max-width: 770px)' })

    return(
        <footer style={{marginTop: '7rem', backgroundColor: '#212529', paddingTop: '2rem', paddingBottom: '2rem', color: '#e9eff9'}}>
            <Container>
                <Row>
                    <Col md={8}>
                    © 1921—{year} Учреждение образования «Белорусский государственный медицинский университет».
                    </Col>
                    <Col style={
                        mobile
                        ? {marginTop: '1rem'}
                        : {}
                    } md={4}>
                    <a className="footer_link" href="https://www.bsmu.by/page/18/1481/">
                     Контактная информация</a>
                     <div>220083, г. Минск, пр. Дзержинского, 83</div>
                     <div>Тел: +375 17 252-12-01. Факс: +375 17 348-12-02</div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
})

export default Footer;