import logo from "./logo.svg";
import "./App.css";
import Registr from "./Components/registr";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Registr />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
