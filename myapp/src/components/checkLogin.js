import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/checkLoginStyle.css";

export default class CheckLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      isLogin: false,
      exit: false,
    };
  }

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
              message: two.substring(0, two.length - 1),
              isLogin: true,
              exit: false,
            })
          );
        }
      });
  };

  goCheck = () => {
    this.check();
  };

  logOut = () => {
    fetch("https://localhost:5001/api/log/logOut", {
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
        if (result.includes("true")) {
          console.log("logout" + JSON.stringify(result));
          this.setState({ exit: true });
        }
      });
  };
  out = () => {
    this.logOut();
    setTimeout(() => {
      if (this.state.exit)
        alert("Вы вышли из аккаунта \nПерезагрузите страницу");
    }, 500);
  };

  componentDidMount() {
    this.goCheck();
  }

  render() {
    return (
      <Container className="checkLogin">
        {this.state.isLogin ? (
          <Container className="acc">
            <p>{this.state.message}</p>
            <Link onClick={this.out} to={"/"}>
              Выйти из аккаунта
            </Link>
          </Container>
        ) : (
          <Container className="acc">
            <Link to={"/login"}>Войти в аккаунт</Link>
          </Container>
        )}
      </Container>
    );
  }
}
