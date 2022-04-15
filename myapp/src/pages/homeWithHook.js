import "../styles/homestyle.css";
import React, { Component } from "react";
import { url } from "../components/urlvideos";
import * as picture from "../components/pictures";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomeWithHook() {
  const [pic, setPic] = useState(picture.bg);

  return (
    <div>
      <Link
        to="/pers"
        onPointerOver={() => {
          document.body.style = "background: url('"+picture.pers+"');";
        }}
      >
        pers
      </Link>
      <Link
        to="/world"
        onPointerOver={() => {
          document.body.style = "background: url('"+picture.luffy+"');";
        }}
      >
        world
      </Link>
    </div>
  );
}

export default HomeWithHook;
