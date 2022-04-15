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

function App() {
  return (
    <Container>
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
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
