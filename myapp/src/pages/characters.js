import React, { Component } from "react";
import CheckLogin from "../components/checkLogin";
import TextEditorComponent from "../components/textEditorComponent";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/charactersStyle.css";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
//import Page from "../components/page";

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

  // collapse = () => {
  //   let list = document.querySelectorAll("#description");
  //   console.log("description" + list.length);
  //   for (let i = 0; i < list.length; i++) {
  //     list[i].addEventListener("click", function () {
  //       this.classList.toggle("active");
  //       let content = this.nextElementSibling;
  //       if(content.style.maxHeight){
  //         content.style.maxHeight = null;
  //       } else{
  //         content.style.maxHeight = null;
  //       }
  //     });
  //   }
  // };

  render() {
    return (
      <>
        <CheckLogin />
        <Container className="linkToCreate">
          <Link className="createPage" to={"/createPage"}>
            Создать страничку
          </Link>
        </Container>
        <Container
          className="pages"
          onClick={(e) => {
            alert(e.target.classList);
          }}
        >
          {this.state.pages != null ? (
            this.state.pages.map((page) => (
              <Container className="page">
                <Container key={page.id} className={"container " + page.id}>
                  <div className={"name" + page.name}>{page.name}</div>
                  <p id={"description"} className={"description" + page.id}>
                    <img
                      className="image"
                      src={"data:" + page.typePic + ";base64," + page.pic}
                    />
                    <div className="text"
                      dangerouslySetInnerHTML={{ __html: page.description }}
                    />
                  </p>
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
{
  /* <Page
                key={page.id}
                text={page.description}
                picture={page.pic}
                type={page.typePic}
              /> */
}
