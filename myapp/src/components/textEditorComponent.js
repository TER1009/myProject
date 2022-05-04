import React, { Component } from "react";
import "../styles/EditorStyle.css";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/EditorStyle.css";
import { Navigate } from "react-router-dom";

const modules = {
  toolbar: ["bold", "italic", "underline", "link", "clean"],
};

export default class TextEditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlFile: "",
      file: "",
      typeContent: "",
      text: "",
      name: "",
      disable: false,
      redirect: false,
    };
  }

  componentDidMount() {
    console.log(this.state.text);
  }

  handleChange = (value) => {
    this.setState(
      (this.state = {
        text: value,
      })
    );
    console.log(this.state.text);
  };

  download = (e) => {
    this.setState(
      (this.state = {
        urlFile: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      })
    );
    console.log("urlFile " + this.state.urlFile);
    console.log("file " + this.state.file);
    console.log("file " + this.state.file.type);
  };

  Select = (e) => {
    this.setState((this.state = { typeContent: e.target.value }));
    console.log(e.target.value);
  };

  postPage = async () => {
    let file = this.state.file;
    let data = new FormData();
    data.append("typeContent", this.state.typeContent);
    data.append("description", this.state.text);
    data.append("pic", file);
    data.append("typePic", file.type);
    data.append("name", this.state.name);
    console.log(data);
    await fetch("https://localhost:5001/api/pages/postPage", {
      method: "POST",
      credentials: "include",
      headers: {
        //Accept: "application/json",
        //"Content-Type": "application/json",
      },
      mode: "cors",
      body: data,
    })
      .then((response) => response.text())
      .then((result) => {
        //if (result.includes(true))
        this.setState((this.state = { redirect: true }));
        console.log("editor " + result);
      });
  };

  changeName = (e) => {
    this.setState({ name: e.target.value });
    console.log(e.target.value);
  };

  changePage = async () => {
    let file = this.state.file;
    let data = new FormData();
    data.append("typeContent", this.state.typeContent);
    data.append("description", this.state.text);
    data.append("pic", file);
    data.append("typePic", file.type);
    data.append("name", this.state.name);
    await fetch("https://localhost:5001/api/pages/postPage", {
      method: "POST",
      credentials: "include",
      headers: {
        //Accept: "application/json",
        //"Content-Type": "application/json",
      },
      mode: "cors",
      body: data,
    })
      .then((response) => response.text())
      .then((result) => {
        //if (result.includes(true))
        this.setState((this.state = { redirect: true }));
        console.log("editor " + result);
      });

    setTimeout(() => {
      this.props.setChange();
    }, 500);
  };

  render() {
    if (this.state.redirect) return <Navigate to={"/"} />;
    else
      return (
        <div className="TextEditorComponent">
          <Container className="mainEditor">
            <Form className="form">
              <Form.Select
                className="typeContent"
                aria-label="Default select example"
                onChange={this.Select}
                value={this.props.change ? this.props.type : ""}
              >
                <option>Выберите тип страницы</option>
                <option value="Персонаж">Персонаж</option>
                <option value="Фрукт">Фрукт</option>
                <option value="Место">Место</option>
              </Form.Select>
              <Form.Group className="downloadPicture">
                <Form.Label className="textDownloadPicture">
                  Выберите картинку
                </Form.Label>
                <Form.Control
                  accept="image/*"
                  onChange={this.download}
                  type="file"
                ></Form.Control>
              </Form.Group>
            </Form>
            <Container className="imgContainer">
              {this.state.urlFile === "" ? (
                <></>
              ) : (
                <img
                  className="img"
                  src={this.props.change ? this.props.file : this.state.urlFile}
                  alt="Загрузите картинку!"
                />
              )}
            </Container>
            <Container className="name">
              <p>
                {this.props.change ? this.props.name : "Введите имя/название"}
              </p>
              <input
                maxLength={75}
                onChange={this.changeName}
                className="nameInput"
                type={"text"}
              />
            </Container>
            <Container className="containerEditor">
              <p>Введите описание</p>
              <ReactQuill
                value={this.props.change ? this.props.text : this.state.text}
                onChange={this.handleChange}
                modules={modules}
              />
            </Container>
            <Container className="post">
              <Button onClick={this.postPage}>
                {this.props.change ? "Изменить" : "Сохранить"}
              </Button>
            </Container>
          </Container>
        </div>
      );
  }
}
