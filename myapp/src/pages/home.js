import "../styles/homestyle.css";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Mycard from "../components/card";
import CheckLogin from "./../components/checkLogin";
import "../styles/homestyle.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: true, // для отображения загрузки
    };
  }

  render() {
    if (this.state.loading) {
      return (
        <React.Fragment>
          <CheckLogin />
          <Container className="main">
            <Container className="tags">
              <Mycard
                src={"/characters"}
                text="ПЕРСОНАЖИ"
                wdht="5cm"
                hght="1cm"
                className="cardlink"
              />
              <Mycard
                src={"/world"}
                text="ВСЕЛЕННАЯ"
                wdht="5cm"
                hght="1cm"
                className="cardlink"
              />
              <Mycard
                src={"/episods"}
                text="ЭПИЗОДЫ"
                wdht="5cm"
                hght="1cm"
                className="cardlink"
              />
              <Mycard
                src={"/manga"}
                text="ГЛАВЫ"
                wdht="5cm"
                hght="1cm"
                className="cardlink"
              />
            </Container>
            <p
              className="text
              "
            >
              Богатство, слава и власть! Король пиратов Голд Роджер сумел
              покорить эти вершины! <br />
              Слова сказанные им перед смертью захватили умы многих: <br />- Мои
              сокровища, берите их если сможете! Теперь вы знаете где я их
              оставил! <br />В погоне за своей мечтой, все ринулись на Гранд
              Лайн и настала Великая Эра Пиратов!
            </p>
          </Container>
        </React.Fragment>
      );
    }
  }
}
