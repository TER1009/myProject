import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

import CheckLogin from "../components/checkLogin";
import "../styles/worldStyle.css";

export default class World extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      fruits: [],
      get: true,
      isLogin: false,
    };
  }

  getPages = async () => {
    await fetch("https://localhost:5001/api/pages/getPlaces", {
      method: "GET",
      //mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("getPages " + response);
      response.json().then((result) => {
        this.setState(
          (this.state = {
            places: result,
            get: false,
          })
        );
      });
    });

    await fetch("https://localhost:5001/api/pages/getFruits", {
      method: "GET",
      //mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("getPages " + response);
      response.json().then((result) => {
        this.setState(
          (this.state = {
            fruits: result,
            get: false,
          })
        );
      });
    });
  };

  check = async () => {
    await fetch("https://localhost:5001/api/log/checkLogIn", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result.includes(true)) {
          const [one, two] = result.split(" ");
          this.setState(
            (this.state = {
              isLogin: true,
            })
          );
        } else if (result.includes(false))
          this.setState(
            (this.state = {
              isLogin: false,
            })
          );
      });
  };

  componentDidMount() {
    this.check();
    this.getPages();
    setTimeout(() => {
      this.collapse();
      this.collapse2();
    }, 1000);
  }

  collapse = () => {
    let list = document.querySelectorAll(".page ");
    console.log("list " + list);
    if (list !== null)
      for (let i = 0; i < list.length; i++) {
        list[i].firstChild.addEventListener("click", function () {
          this.classList = "active";
          let content = this.nextSibling;
          if (content.style.display && content !== null) {
            content.style.display = null;
          } else {
            content.style.display = "inline";
          }
        });
      }
  };
  collapse2 = () => {
    let list = document.querySelectorAll(".heading ");
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener("click", function () {
        this.classList = "active";
        let content = this.nextSibling;
        if (content.style.display && content !== null) {
          content.style.display = null;
        } else {
          content.style.display = "inline";
        }
      });
    }
  };

  render() {
    return (
      <>
        <CheckLogin />
        <Container className="linkToCreate">
          {this.state.isLogin ? (
            <Link className="createPage" to={"/createPage"}>
              Создать страничку
            </Link>
          ) : (
            <></>
          )}
        </Container>
        <Container className="places">
          <p className="heading">Места</p>
          {this.state.places != null ? (
            this.state.places.map((place) => (
              <Container key={place.id} className="page">
                <div className={"name"}>{place.name}</div>
                <Container
                  id={"description"}
                  className={"description" + place.id}
                >
                  <img
                    className="image"
                    src={"data:" + place.typePic + ";base64," + place.pic}
                  />
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: place.description }}
                  />
                </Container>
              </Container>
            ))
          ) : (
            <></>
          )}
        </Container>
        <Container className="fruits">
          <p className="heading">Дьявольские фрукты</p>
          {this.state.fruits != null ? (
            this.state.fruits.map((fruit) => (
              <Container key={fruit.id} className="page">
                <div className={"name"}>{fruit.name}</div>
                <Container
                  id={"description"}
                  className={"description" + fruit.id}
                >
                  <img
                    className="image"
                    src={"data:" + fruit.typePic + ";base64," + fruit.pic}
                  />
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: fruit.description }}
                  />
                </Container>
              </Container>
            ))
          ) : (
            <></>
          )}
        </Container>
      </>
    );
  }
}
