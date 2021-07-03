import { useState } from "react";
import { useQuery } from "react-query";
import { Row, Col } from "antd";
import { BASE_URL, MOVIEKEY } from "../utils";
//componentes
import Loading from "../Components/Loading";
import MovieCatalog from "../Components/MovieCatalog";
import Pagination from "../Components/Pagination";
//funciones fetch para the moviedb
const lanzamientos = async (page) => {
  let url = `${BASE_URL}now_playing?api_key=${MOVIEKEY}&language=en-US&page=${page}`;
  if (page) {
    url = `${BASE_URL}now_playing?api_key=${MOVIEKEY}&language=en-US&page=${
      page + 1
    }`;
  }
  const response = await fetch(url);
  return response.json();
};

const NewMovie = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    error,
    isFetching,
    isPreviousData,
    isLoading,
    isError,
  } = useQuery(["movielist", page], () => lanzamientos(page), {
    keepPreviousData: true,
  });

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Error: {error.message}</p>
  ) : (
    <section>
      <Row>
        <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
          <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
            Ultimos Lanzamientos
          </h1>
        </Col>
      </Row>
      {data.results ? (
        <div>
          <Pagination
            isPreviousData={isPreviousData}
            isFetching={isFetching}
            page={page}
            changePage={(page) => setPage(page)}
          />
          <Row>
            <MovieCatalog movies={data.results} />
          </Row>
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default NewMovie;