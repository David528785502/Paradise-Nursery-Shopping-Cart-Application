import React from "react";
import { Link } from "react-router-dom";
import "./App.css"; // Asegúrate de tener la imagen de fondo aquí

const App = () => {
  return (
    <div className="home-container">
      <h1>Paradise Nursery</h1>
      <p>Welcome to our online plant store!</p>
      <Link to="/products">
        <button className="start-button">Comenzar</button>
      </Link>
    </div>
  );
};

export default App;
