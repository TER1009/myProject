import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Component } from "react";
import main from "./main.css";
import { Button } from "@mui/material";
import * as React from "react";

class Registr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      middlename: "",
      email: "",
      password: "",
    };
  }

  changeName = (event) => {
    this.setState(
      (this.state = {
        name: event.target.value,
      })
    );
    console.log("name: " + this.state.name);
  };
  changeSurname = (event) => {
    this.setState(
      (this.state = {
        surname: event.target.value,
      })
    );
    console.log("surname: " + this.state.surname);
  };
  changeMiddlename = (event) => {
    this.setState(
      (this.state = {
        middlename: event.target.value,
      })
    );
    console.log("middlename: " + this.state.middlename);
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
  postUser = () => {
    let _jsonUser = JSON.stringify(this.state);
    console.log(_jsonUser);
    let _urlApi = "https://localhost:5001/api/registr";
    let response = fetch(_urlApi, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: _jsonUser,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(JSON.stringify(result));
      });
  };

  render() {
    return (
      <div className="main">
        <TextField
          className="textInput"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={this.changeName}
        />
        <TextField
          className="textInput"
          id="outlined-basic"
          label="Surname"
          variant="outlined"
          onChange={this.changeSurname}
        />
        <TextField
          className="textInput"
          id="outlined-basic"
          label="Middlename"
          variant="outlined"
          onChange={this.changeMiddlename}
        />
        <TextField
          className="textInput"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onChange={this.changeEmail}
        />
        <TextField
          className="textInput"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={this.changePassword}
        />
        <Button onClick={this.postUser} variant="outlined">
          Отправить
        </Button>
      </div>
    );
  }
}

export default Registr;
