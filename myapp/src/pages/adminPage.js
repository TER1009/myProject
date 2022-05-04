import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { ReportGmailerrorredIcon } from "@mui/icons-material/ReportGmailerrorred";
import "../styles/adminPageStyle.css";
import CreatePage from "./createPage";
import TextEditorComponent from "../components/textEditorComponent";

export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      change: false,
      pageId,
    };
  }

  setChange = (e) => {
    this.setState({ change: true, pageId: e.target.id });
  };

  getPages = async () => {
    await fetch("https://localhost:5001/api/report/getReports", {
      method: "GET",
      //mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((result) => {
        //console.log(typeof result);
        if (typeof result === "object" && result.length > 0) {
          console.log(typeof result);
          this.setState({
            pages: result,
          });
          console.log(this.state.pages[0].name);
        }
      });
    });
  };

  componentDidMount() {
    this.getPages();
    setTimeout(() => {
      this.collapse();
    }, 300);
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

  render() {
    if (this.state.change)
      return (
        <TextEditorComponent
          change={true}
          setChange={this.setChange}
          pageId={this.state.pageId}
        />
      );
    else
      return (
        <Container className={"adminPage"}>
          this adminPage
          {this.state.pages.map((page) => (
            <Container key={page.id} className="page">
              <div style={{ cursor: "pointer" }} className={"name"}>
                {page.name}
              </div>
              <Container id={"description"} className={"description" + page.id}>
                <img
                  className="image"
                  src={"data:" + page.typePic + ";base64," + page.pic}
                />
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: page.description }}
                />
                <Container className="tools">
                  <Button
                    id={page.id}
                    onClick={this.setChange}
                    className="changeBut"
                  >
                    Изменить
                  </Button>
                  <Button id={page.id} className="deleteBut">
                    Удалить
                  </Button>
                </Container>
              </Container>
            </Container>
          ))}
        </Container>
      );
  }
}
