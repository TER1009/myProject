import { Component } from "react";
import * as React from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import "../styles/loginStyle.css";
import { Navigate } from "react-router-dom";
import CheckLogin from "../components/checkLogin";

class Registr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      email: "",
      password: "",
      status: "",
      feedback: false,
      text: "",
      userFeedback: false,
      redirect: false,
    };
  }

  changeNickname = (event) => {
    this.setState(
      (this.state = {
        nickname: event.target.value,
        feedback: "",
      })
    );
    console.log("name: " + this.state.nickname);
  };

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
    let data = {
      nickname: this.state.nickname,
      email: this.state.email,
      password: this.state.password,
    };
    let _jsonUser = JSON.stringify(data);
    console.log(_jsonUser);
    fetch("https://localhost:5001/api/log/register", {
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
        if (result.includes(true))
          this.setState(
            (this.state = {
              text: "Регистрация выполнена \nВойдите в аккаунт",
              feedback: true,
              go: true,
            })
          );
        else
          this.setState(
            (this.state = {
              text: result,
              feedback: false,
              go: false,
            })
          );
        console.log("registaration " + this.state.text);
      });
  };

  redirect = () => {
    console.log("registaration " + this.state.feedback);
    this.postUser();
    console.log("registaration " + this.state.feedback);
    setTimeout(() => {
      if (this.state.feedback) {
        let message = window.confirm(this.state.text);
        if (message && this.state.text !== "")
          this.setState((this.state = { userFeedback: true }));
      } else {
        this.setState((this.state = { userFeedback: false }));
        alert(this.state.text);
      }
    }, 500);
  };

  componentDidMount() {}

  render() {
    if (this.state.userFeedback) return <Navigate to={"/login"} />;
    else
      return (
        <Container>
          <CheckLogin />
          <Container className="login">
            <Container className="regform">
              <InputGroup className="inputs">
                <InputGroup className="nickname">
                  <FormControl
                    placeholder="nickname"
                    //aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={this.changeNickname}
                  />
                </InputGroup>
                <InputGroup className="email">
                  <FormControl
                    placeholder="email"
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
              onClick={this.redirect}
              variant="outline-primary"
            >
              Зарегистрироваться
            </Button>
          </Container>
        </Container>
      );
  }
}

export default Registr;
