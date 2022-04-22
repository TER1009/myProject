import React, { Component } from "react";
import { Container } from "react-bootstrap";
import CheckLogin from "../components/checkLogin";
import { url } from "../components/urlvideos";
import Videoplayer from "../components/videoplayer";
import "../styles/episodsstyle.css";

export default class anime extends Component {
  render() {
    return (
      <>
      <CheckLogin/>
        <Container className="info">
          <dl className="row">
            <dt>Тип</dt>
            <dd>ТВ Сериал</dd>
            <dt>Эпизоды</dt>
            <dd>1004/?</dd>
            <dt>Жанр</dt>
            <dd>Драма, Комедия, Приключения, Сёнэн, Фэнтези, Экшен</dd>
            <dt>Первоисточник</dt>
            <dd>Манга</dd>
            <dt>Сезон</dt>
            <dd>Осень 1999</dd>
            <dt>Выпуск</dt>
            <dd>с 20 октября 1999</dd>
            <dt>Студия</dt>
            <dd>Toei Animation</dd>
            <dt>Возрастные ограницения</dt>
            <dd>18+</dd>
            <dt>Длительность</dt>
            <dd>24 мин. ~ серия</dd>
            <dt>Режиссер</dt>
            <dd>Сакай Мунэхиса, Уда Коносукэ, Нагаминэ Тацуя</dd>
            <dt>Автор оригинала</dt>
            <dd>Ода Эйитиро</dd>
          </dl>
        </Container>
        <Container className="text">
          <div className="table-wide">
            <div className="table-wide-inner">
              <table
                className="wikitable"
                border="1"
                style={{
                  textalign: "center",
                  fontsize: 80 + "%",
                  width: 100 + "%",
                  bordercollapse: "collapse",
                  bordercolor: "#999",
                  background: "#F9F9F9",
                }}
              >
                <tbody>
                  <tr>
                    <th
                      width="0.14285714285714%"
                      style={{ background: "#DADADA" }}
                    >
                      Сага Ист Блю
                    </th>
                    <th
                      width="0.14285714285714%"
                      style={{ background: "#DADADA" }}
                    >
                      Сага Алабасты
                    </th>
                    <th
                      width="0.14285714285714%"
                      style={{ background: "#DADADA" }}
                    >
                      Сага Небесного Острова
                    </th>
                    <th
                      width="0.14285714285714%"
                      style={{ background: "#DADADA" }}
                    >
                      Сага Water 7
                    </th>
                    <th
                      width="0.14285714285714%"
                      style={{ background: "#DADADA" }}
                    >
                      Сага Триллер Барка
                    </th>
                    <th
                      width="0.14285714285714%"
                      style={{ background: "#DADADA" }}
                    >
                      Сага Великой Войны
                    </th>
                    <th
                      width="0.14285714285714%"
                      style={{ background: "#DADADA" }}
                    >
                      Сага Острова Рыболюдей
                    </th>
                    <th
                      width="0.14285714285714%"
                      style={{ background: "#DADADA" }}
                    >
                      Сага Дресс Розы
                    </th>
                    <th
                      width="0.14285714285714%"
                      style={{ background: "#DADADA" }}
                    >
                      Сага Ёнко
                    </th>
                  </tr>
                  <tr>
                    <td>
                      Арка На Заре Приключений
                      <span style={{ whitespace: "nowrap" }}>(1-3)</span>
                    </td>
                    <td>
                      Арка Реверс Маунтин{" "}
                      <span style={{ whitespace: "nowrap" }}>(62-63)</span>
                    </td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Острова Коз{" "}
                      <span style={{ whitespace: "nowrap" }}>(136-138)</span>
                    </th>
                    <td>
                      Арка Лонг Ринг Лонг Ленда{" "}
                      <span style={{ whitespace: "nowrap" }}>(207-219)</span>
                    </td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Лавли Ленда{" "}
                      <span style={{ whitespace: "nowrap" }}>(326-336)</span>
                    </th>
                    <td>
                      Арка Архипелага Сабаоди{" "}
                      <span style={{ whitespace: "nowrap" }}>(385-405)</span>
                    </td>
                    <td>
                      Арка Возвращения на Сабаоди{" "}
                      <span style={{ whitespace: "nowrap" }}>(517-522)</span>
                    </td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Амбиций Z{" "}
                      <span style={{ whitespace: "nowrap" }}>(575-578)</span>
                    </th>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Серебряного Рудника{" "}
                      <span style={{ whitespace: "nowrap" }}>(747-750)</span>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      Арка Орандж-Тауна{" "}
                      <span style={{ whitespace: "nowrap" }}>(4-8)</span>
                    </td>
                    <td>
                      Арка Виски Пик{" "}
                      <span style={{ whitespace: "nowrap" }}>(64-67)</span>
                    </td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Острова Рулука{" "}
                      <span style={{ whitespace: "nowrap" }}>(139-143)</span>
                    </th>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Океанского Сна{" "}
                      <span style={{ whitespace: "nowrap" }}>(220-224)</span>
                    </th>
                    <td>
                      Арка Триллер Барка{" "}
                      <span style={{ whitespace: "nowrap" }}>(337-381)</span>
                    </td>
                    <th style={{ background: "#CCFFFF" }}>
                      Историческая арка{" "}
                      <span style={{ whitespace: "nowrap" }}>(406-407)</span>
                    </th>
                    <td>
                      Арка Острова Рыболюдей{" "}
                      <span style={{ whitespace: "nowrap" }}>(523-574)</span>
                    </td>
                    <td>
                      Арка Панк Хазарда{" "}
                      <span style={{ whitespace: "nowrap" }}>(579-625)</span>
                    </td>
                    <td>
                      Арка Дзо{" "}
                      <span style={{ whitespace: "nowrap" }}>(751-779)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Арка Деревни Сиропа{" "}
                      <span style={{ whitespace: "nowrap" }}>(9-18)</span>
                    </td>
                    <td>
                      Арка Коби и Хельмеппо{" "}
                      <span style={{ whitespace: "nowrap" }}>(68-69)</span>
                    </td>
                    <td>
                      Арка Джаи{" "}
                      <span style={{ whitespace: "nowrap" }}>(144-152)</span>
                    </td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Возвращения Фокси{" "}
                      <span style={{ whitespace: "nowrap" }}>(225-228)</span>
                    </th>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Острова-Спа{" "}
                      <span style={{ whitespace: "nowrap" }}>(382-384)</span>
                    </th>
                    <td>
                      Арка Амазон Лили{" "}
                      <span style={{ whitespace: "nowrap" }}>(408-421)</span>
                    </td>
                    <td></td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Возвращения Цезаря{" "}
                      <span style={{ whitespace: "nowrap" }}>(626-628)</span>
                    </th>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Сверхновых Дозорных{" "}
                      <span style={{ whitespace: "nowrap" }}>(780-782)</span>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      Арка Барати{" "}
                      <span style={{ whitespace: "nowrap" }}>(19-30)</span>
                    </td>
                    <td>
                      Арка Литл Гардена{" "}
                      <span style={{ whitespace: "nowrap" }}>(70-77)</span>
                    </td>
                    <td>
                      Арка Скайпии{" "}
                      <span style={{ whitespace: "nowrap" }}>(153-195)</span>
                    </td>
                    <td>
                      Арка Water 7{" "}
                      <span style={{ whitespace: "nowrap" }}>(229-263)</span>
                    </td>
                    <td></td>
                    <td>
                      Арка Импел Дауна Часть 1{" "}
                      <span style={{ whitespace: "nowrap" }}>(422-425)</span>
                    </td>
                    <td></td>
                    <td>
                      Арка Дресс Розы{" "}
                      <span style={{ whitespace: "nowrap" }}>(629-746)</span>
                    </td>
                    <td>
                      Арка Пирожного Острова{" "}
                      <span style={{ whitespace: "nowrap" }}>(783-877)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Арка Арлонг Парка{" "}
                      <span style={{ whitespace: "nowrap" }}>(31-45)</span>
                    </td>
                    <td>
                      Арка Острова Драм{" "}
                      <span style={{ whitespace: "nowrap" }}>(78-91)</span>
                    </td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка G-8{" "}
                      <span style={{ whitespace: "nowrap" }}>(196-206)</span>
                    </th>
                    <td>
                      Арка Эниес Лобби{" "}
                      <span style={{ whitespace: "nowrap" }}>(264-312)</span>
                    </td>
                    <td></td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Литл Ист Блю{" "}
                      <span style={{ whitespace: "nowrap" }}>(426-429)</span>
                    </th>
                    <td></td>
                    <td></td>
                    <td>
                      Арка Совета Королей{" "}
                      <span style={{ whitespace: "nowrap" }}>(878-889)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Арка Истории Багги{" "}
                      <span style={{ whitespace: "nowrap" }}>(46-47)</span>
                    </td>
                    <td>
                      Арка Алабасты{" "}
                      <span style={{ whitespace: "nowrap" }}>(92-130)</span>
                    </td>
                    <td></td>
                    <td>
                      Арка Пост-Эниес Лобби{" "}
                      <span style={{ whitespace: "nowrap" }}>(313-325)</span>
                    </td>
                    <td></td>
                    <td>
                      Арка Импел Дауна Часть 2{" "}
                      <span style={{ whitespace: "nowrap" }}>(430-456)</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      Арка страны Вано Часть 1{" "}
                      <span style={{ whitespace: "nowrap" }}>(890-894)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Арка Логтауна{" "}
                      <span style={{ whitespace: "nowrap" }}>(48-53)</span>
                    </td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Пост-Алабасты{" "}
                      <span style={{ whitespace: "nowrap" }}>(131-135)</span>
                    </th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      Арка Маринфорда{" "}
                      <span style={{ whitespace: "nowrap" }}>(457-489)</span>
                    </td>
                    <td></td>
                    <td></td>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Углекислотного Короля{" "}
                      <span style={{ whitespace: "nowrap" }}>(895-896)</span>
                    </th>
                  </tr>
                  <tr>
                    <th style={{ background: "#CCFFFF" }}>
                      Арка Острова-линкора{" "}
                      <span style={{ whitespace: "nowrap" }}>(54-61)</span>
                    </th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      Послевоенная Арка{" "}
                      <span style={{ whitespace: "nowrap" }}>(490-516)</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      Арка страны Вано Часть 2{" "}
                      <span style={{ whitespace: "nowrap" }}>(897-)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <div
                class="fl-scrolls fl-scrolls-hidden"
                data-orientation="horizontal"
                style="width: 627px; left: 108.547px; height: 16px;"
              >
                <div style="width: 752px;"></div>
              </div> */}
            </div>
          </div>
        </Container>
        <Videoplayer />
      </>
    );
  }
}
