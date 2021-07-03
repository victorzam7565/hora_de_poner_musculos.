import "./slider.scss";
import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";

const Slider = ({ movies }) => {
  return (
    <Carousel autoplay dotPosition="right">
      {movies.map((movie) => {
        return <Movie key={movie.id} movie={movie} />;
      })}
    </Carousel>
  );
};

export default Slider;

const Movie = ({ movie }) => {
  const { title, overview, id, backdrop_path } = movie;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  return (
    <div
      className="slider-movies__movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="slider-movies__movie-info">
        <div>
          <h2>{title}</h2>
          <p>{overview}</p>
          <Link to={`/movie/${id}`}>
            <Button type="primary" size="large">
              ver mas de {title}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};