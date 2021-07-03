import { useQuery } from "react-query";
import { BASE_URL, MOVIEKEY } from "../utils";
//componentes de antd
import { Row, Col } from "antd";
//componentes
import Loading from "../Components/Loading";
import Slider from "../Components/Slider";
import MovieList from "../Components/MovieList";
//queries
const fetchMovies = async (key, params) => {
  const response = await fetch(`${BASE_URL}now_playing?api_key=${MOVIEKEY}`);
  return response.json();
};
const fetchMoviesPopular = async (key, params) => {
  const response = await fetch(`${BASE_URL}popular?api_key=${MOVIEKEY}`);
  return response.json();
};
const fetchMoviesTop = async (key, params) => {
  const response = await fetch(`${BASE_URL}top_rated?api_key=${MOVIEKEY}`);
  return response.json();
};

const Home = () => {
  const { data, status } = useQuery("movies", fetchMovies);
  const { data: popular, isLoading: loadingPop } = useQuery(
    "popmovies",
    fetchMoviesPopular
  );
  const { data: topMovies, isLoading: loadingTop } = useQuery(
    "topmovies",
    fetchMoviesTop
  );

  if (status === "loading" || loadingPop || loadingTop) {
    return <Loading />;
  }
  if (status === "error") {
    return "Error en la query";
  }
  return (
    <div>
      <Slider movies={data.results} />
      <Row gutter={[32, 24]}>
        <Col span={12}>
          <MovieList title="Pelis Pop" movies={popular.results} />
        </Col>
        <Col span={12}>
          <MovieList title="Pelis Top" movies={topMovies.results} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;