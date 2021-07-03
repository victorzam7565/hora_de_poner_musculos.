import { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import querystring from "query-string";
import { withRouter } from "react-router-dom";
import React, { Component }  from 'react';
//componentes
import MovieCatalog from "../Components/MovieCatalog";
import Loading from "../Components/Loading";
import { MOVIEKEY } from "../utils";
const Searchquery = ({ location, history }) => {
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    (async () => {
      const searchValue = querystring.parse(location.search);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEKEY}&query=${searchValue.query}&page=1&include_adult=true`
      );
      const { results } = await response.json();
      setMovieList(results);
      setSearchValue(searchValue.query);
    })();
  }, [location.search]);

  const handleSearch = (e) => {
    const urlParams = querystring.parse(location.search);
    urlParams.query = e.target.value;
    history.push(`?${querystring.stringify(urlParams)}`);
    setSearchValue(e.target.value); //console.log(e.target.value);
  };
  return (
    <section>
      <Row>
        <Input
          size="large"
          type="search"
          name="search"
          placeholder="Busca una Movie "
          onChange={handleSearch}
        />
      </Row>
      {movieList ? (
        <Row>
          <MovieCatalog movies={movieList} />
        </Row>
      ) : (
        <Row>
          <Col span="24" style={{ textAlign: "center", marginTop: "2em" }}>
            <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
              Aun no has buscado nada
            </h1>
          </Col>
        </Row>
      )}
    </section>
  );
};

export default withRouter(Searchquery);