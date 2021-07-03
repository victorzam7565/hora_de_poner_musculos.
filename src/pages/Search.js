import { useState } from "react";
import { Row, Col, Input } from "antd";
import { useQuery } from "react-query";
import React, { Component }  from 'react';
//componentes
import MovieCatalog from "../Components/MovieCatalog";
import Loading from "../Components/Loading";
import { MOVIEKEY } from "../utils";
//funcion que llama a la api
const searchMovie = async (searched) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEKEY}&query=${searched}&page=1&include_adult=true`
  );
  return response.json();
};
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error } = useQuery(
    ["searchedmovies", searchValue],
    () => searchMovie(searchValue),
    {
      enabled: searchValue === "" ? false : true,
      keepPreviousData: true,
    }
  ); //todo refactor code because is 💩
  if (isLoading) return <Loading />;
  if (error) return <span>{error}</span>;
  console.log(data);
  const handleSearch = (e) => {
    const { target } = e;
    const { value } = target;
    setSearchValue(value);
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
      {data ? (
        <Row>
          <MovieCatalog movies={data.results} />
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

export default Search;