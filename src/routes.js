import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import NewMovie from "./pages/NewMovies";
import Pop from "./pages/Populares";
import Search from "./pages/Search";
import Error404 from "./pages/Error404/Error404";
import Searchquery from "./pages/Searchquery";
import React, { Component }  from 'react';

const Rutas = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movie/:id" component={Movie} />
        <Route exact path="/newmovie" component={NewMovie} />
        <Route exact path="/pop" component={Pop} />
        <Route exact path="/search" component={Searchquery} />
        <Route exact path="*" component={Error404} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Rutas;