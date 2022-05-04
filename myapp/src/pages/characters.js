import React, { Component } from "react";
import CheckLogin from "../components/checkLogin";
import TextEditorComponent from "../components/textEditorComponent";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/charactersStyle.css";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

export default class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      get: true,
      isLogin: false,
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
      response.json().then((result) => {
        if (result.length > 0) {
          this.setState(
            (this.state = {
              pages: result,
              get: false,
            })
          );
          console.log(this.state.pages[0].name);
        }
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
    }, 1000);
  }

  collapse = () => {
    let list = document.querySelectorAll(".page ");
    for (let i = 0; i < list.length; i++) {
      list[i].firstChild.addEventListener("click", function () {
        this.classList = "active";
        let content = this.nextSibling;
        if (content.style.display) {
          content.style.display = null;
        } else {
          content.style.display = "inline";
        }
      });
    }
  };

  report = async (e) => {
    let _body = { pageId: e.target.id };
    console.log("report! " + _body);
    await fetch("https://localhost:5001/api/report/reportPost", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_body),
    }).then((response) => {
      console.log("getPages " + response);
      response.json().then((result) => {});
    });
  };

  render() {
    return (
      <>
        <CheckLogin />
        {this.state.isLogin && (
          <Container className="linkToCreate">
            <Link className="createPage" to={"/createPage"}>
              Создать страничку
            </Link>{" "}
          </Container>
        )}
        <Container className="pages">
          {this.state.pages != null &&
            this.state.pages.map((page) => (
              <Container key={page.id} className="page">
                <div className={"name"}>{page.name}</div>
                <Container
                  id={"description"}
                  className={"description" + page.id}
                >
                  <img
                    className="image"
                    src={"data:" + page.typePic + ";base64," + page.pic}
                  />
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: page.description }}
                  />
                  <div
                    className={"reportBut"}
                    id={page.id}
                    onClick={this.report}
                  >
                    <ReportGmailerrorredIcon />
                    report
                  </div>
                </Container>
              </Container>
            ))}
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
