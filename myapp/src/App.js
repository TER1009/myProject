//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Characters from "./pages/characters";
import World from "./pages/world";
import Episods from "./pages/episods";
import Manga from "./pages/manga";
import Home from "./pages/home";
import LogIn from "./pages/logIn";
import Registr from "./pages/registration";
import { Container } from "react-bootstrap";
import Header from "./components/header";
import "./styles/App.css";
import CreatePage from "./pages/createPage";
import AdminPage from "./pages/adminPage";
import React, { useState } from "react";
import { useEffect } from "react";

function App() {
  const [role, setRole] = useState("");
  const getRole = async () => {
    fetch("https://localhost:5001/api/log/getRole", {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status == 200)
        response.json().then((result) => {
          console.log("app " + result);
          const [one, two] = result.split(" ");
          setRole(two);
        });
    });
  };

  useEffect(() => {
    getRole();
    console.log("app " + role);
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/world" element={<World />} />
        <Route path="/episods" element={<Episods />} />
        <Route path="/manga" element={<Manga />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reg" element={<Registr />} />
        <Route path="/createPage" element={<CreatePage />} />
        {role === "admin" ? (
          <Route path="/admin" element={<AdminPage />} />
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
