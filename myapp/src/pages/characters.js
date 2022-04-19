import React, { Component } from "react";
import CheckLogin from "../components/checkLogin";
import TextEditorComponent from "../components/textEditorComponent";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/charactersStyle.css";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Page from "../components/page";

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
            pages: result,
            get: false,
          })
        );
        console.log(this.state.pages[0].name);
      });
    });
  };

  componentDidMount() {
    this.getPages();
  }

  render() {
    return (
      <>
        <CheckLogin />
        <Container className="linkToCreate">
          <Link className="createPage" to={"/createPage"}>
            Создать страничку
          </Link>
        </Container>
        <Container className="pages">
          {this.state.pages != null ? (
            this.state.pages.map((page) => (
              <Page
                name={page.name}
                key={page.id}
                id={page.id}
                text={page.description}
                picture={page.pic}
                type={page.typePic}
              />
            ))
          ) : (
            <></>
          )}
        </Container>
      </>
    );
  }
}
{
  /* <Page
                key={page.id}
                text={page.description}
                picture={page.pic}
                type={page.typePic}
              /> */
}
