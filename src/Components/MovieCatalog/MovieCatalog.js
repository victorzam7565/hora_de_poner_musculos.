import { Col, Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./moviecatalog.scss";

const MovieCatalog = ({ movies }) => {
  return movies.map((movie) => (
    <Col key={movie.id} xs={4} className="movie-catalog">
      <MovieCard movie={movie} />
    </Col>
  ));
};

export default MovieCatalog;

const MovieCard = ({ movie }) => {
  const { id, title, poster_path } = movie;
  const { Meta } = Card;
  const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;
  return (
    <Link to={`/movie/${id}`}>
      <Card
        style={{ width: 240 }}
        hoverable
        cover={<img alt={title} src={posterPath} />}
        actions={[<EyeOutlined key="eye" />]}
      >
        <Meta title={title} />
      </Card>
    </Link>
  );
};