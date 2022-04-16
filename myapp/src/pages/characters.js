import React, { Component } from "react";
import CheckLogin from "../components/checkLogin";
import TextEditorComponent from "../components/textEditorComponent";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/charactersStyle.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      get: true,
    };
  }

  getPages = async () => {
    await fetch("https://localhost:5001/api/pages/getCharacters", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log("getPages " + result);
        this.setState(
          (this.state = {
            pages: result,
            get: false,
          })
        );
      });
  };

  render() {
    if (this.state.get) this.getPages();
    return (
      <>
        <CheckLogin />
        <Container className="linkToCreate">
          <Link className="createPage" to={"/createPage"}>Создать страничку</Link>
        </Container>
        <Container className="pages">
          {/* {for(let i = 0; i<this.state.pages.length; i++){
            return <Page/>
          }} */}
        </Container>
      </>
    );
  }
}
