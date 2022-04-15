import React, { Component } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import "../styles/loginStyle.css";
import { Link, Navigate } from "react-router-dom";
import CheckLogin from "../components/checkLogin";

export default class logIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nickname: "",
      redirect: false,
    };
  }

  changeEmail = (event) => {
    this.setState(
      (this.state = {
        email: event.target.value,
      })
    );
    console.log("email: " + this.state.email);
  };

  changePassword = (event) => {
    this.setState(
      (this.state = {
        password: event.target.value,
      })
    );
    console.log("password: " + this.state.password);
  };

  postUser = async () => {
    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    let _jsonUser = JSON.stringify(user);
    console.log(_jsonUser);
    fetch("https://localhost:5001/api/log/logIn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: _jsonUser,
    })
      .then((response) => response.text())
      .then((result) => {
        if (result.includes(true)) {
          const [back, nickname] = result.split(" ");
          console.log(nickname.substring(0, nickname.length - 1));
          let mess = window.confirm("Вы вошли в аккаунт");
          if (mess || !mess) this.setState((this.state = { redirect: true }));
        }
      });
  };

  check = () => {
    this.postUser();
    console.log();
  };

  componentDidMount() {}

  render() {
    if (this.state.redirect) return <Navigate to={"/"} />;
    else
      return (
        <Container>
          <CheckLogin />
          <Container className="login">
            <Container className="regform">
              <InputGroup className="inputs">
                <InputGroup className="nickname">
                  <FormControl
                    placeholder="email"
                    //aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={this.changeEmail}
                  />
                </InputGroup>
                <InputGroup className="password">
                  <FormControl
                    placeholder="password"
                    aria-describedby="basic-addon1"
                    onChange={this.changePassword}
                  />
                </InputGroup>
              </InputGroup>
            </Container>

            <Button
              className="post"
              onClick={this.postUser}
              variant="outline-primary"
            >
              Войти
            </Button>
            <Link className="toReg" to={"/reg"}>
              Регистрация
            </Link>
          </Container>
          {this.state.redirect ? <Navigate to={"/"} /> : <></>}
        </Container>
      );
  }
}
