import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "../styles/checkLoginStyle.css";
import Chat from "./chat";

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
          console.log("checkLogin " + result);
          this.setState(
            (this.state = {
              message: two.substring(0, two.length - 1),
              isLogin: true,
            })
          );
        } else if (result.includes(false)) {
          this.setState(
            (this.state = {
              isLogin: false,
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
          this.setState({ isLogin: false });
        }
      });
  };
  out = () => {
    this.logOut();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  componentDidMount() {
    this.goCheck();
  }

  render() {
    return (
      <Container className="checkLogin">
        <Chat />
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
