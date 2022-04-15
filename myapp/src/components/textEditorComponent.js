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
    // let data = await {
    //   typeContent: this.state.typeContent,
    //   description: this.state.text,
    //   img: this.state.file,
    // };
    let file = this.state.file;
    let data = new FormData();
    data.append("typeContent", this.state.typeContent);
    data.append("description", this.state.text);
    data.append("files", file);
    console.log(data.get("img"));
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

  uploadImg = async () => {
    let form = new FormData();
    let file = this.state.file;
    form.append("files", file);
    await fetch("https://localhost:5001/api/pages/uploadImg", {
      method: "POST",
      headers: {
        //Accept: "application/json",
        //"Content-Type": "application/json",
      },
      mode: "cors",
      body: form,
    })
      .then((response) => {
        response.text();
      })
      .then((result) => {
        console.log(result);
      });
  };

  render() {
    if (this.state.redirect) return <Navigate to={"/"} />;
    else
      return (
        <div className="TextEditorComponentv">
          <Container className="mainEditor">
            <Form className="form">
              <Form.Select
                className="typeContent"
                aria-label="Default select example"
                onChange={this.Select}
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
                  src={this.state.urlFile}
                  alt="Загрузите картинку!"
                />
              )}
            </Container>
            <Container className="containerEditor">
              <ReactQuill
                value={this.state.text}
                onChange={this.handleChange}
                modules={modules}
              />
            </Container>
            <Container className="post">
              <Button onClick={this.postPage}>Сохранить</Button>
            </Container>
          </Container>
        </div>
      );
  }
}
