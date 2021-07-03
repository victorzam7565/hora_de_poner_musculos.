import { Link } from "react-router-dom";
import React, { Component }  from 'react';
import "./Error404.scss";
const Error404 = () => {
  return (
    <div className="Error404">
      <h1>Error404</h1>
      <h2>Página no encontrada</h2>
      <Link to="/">
        <h3>Volver al inicio</h3>
      </Link>
    </div>
  );
};

export default Error404;