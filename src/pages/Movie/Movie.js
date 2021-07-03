import { useState } from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useQuery } from "react-query";
import { BASE_URL, MOVIEKEY } from "../../utils";
import Loading from "../../Components/Loading";
import ModalVideo from "../../Components/ModalVideo";
import React, { Component }  from 'react';
import "./movie.scss";
//funciones fetch de movies
const fetchMovie = async (id) => {
  const response = await fetch(`${BASE_URL}${id}?api_key=${MOVIEKEY}`);
  return response.json();
};

const fetchVideo = async (videoId) => {
  const response = await fetch(
    `${BASE_URL}${videoId}/videos?api_key=${MOVIEKEY}`
  );
  return response.json();
};
//componente main
const Movie = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery("movie", () => fetchMovie(id));
  if (isLoading) return <Loading />;

  return <RenderMovie movieInfo={data} />;
};
const RenderMovie = ({ movieInfo }) => {
  const { backdrop_path, poster_path } = movieInfo;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          {/* PosterMovie */}
          <PosterMovie image={poster_path} />
        </Col>
        <Col span={10} className="movie__info">
          <MovieInfo movie={movieInfo} />
        </Col>
      </Row>
    </div>
  );
};
const PosterMovie = ({ image }) => {
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;
  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
};
const MovieInfo = ({ movie }) => {
  const { id, title, release_date, overview, genres } = movie;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const { data: videoData, isLoading: loadingVideo } = useQuery("video", () =>
    fetchVideo(id)
  );
  if (loadingVideo) return <Loading />;

  const openModal = () => setIsVisibleModal(true);
  const closeModal = () => setIsVisibleModal(false);

  console.log(videoData, "este es el video ");
  const renderVideo = () => {
    if (videoData.results) {
      if (videoData.results.length > 0) {
        return (
          <div>
          

            <Button icon={<PlayCircleOutlined />} onClick={openModal}>
              Ver Trailer
            </Button>
            <ModalVideo
              videoKey={videoData.results[0].key}
              videoPlatform={videoData.results[0].site}
              isOpen={isVisibleModal}
              close={closeModal}
            />
          </div>
        );
      }
    }
  };
  return (
    <div>
      <div className="movie__info-header">
        <h1>
          {title}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        {renderVideo()}
      </div>
      <div className="movie__info-content">
        <h3>General</h3>
        <p>{overview}</p>
        <h3>Generos</h3>
        <ul>
          {genres.map((gender) => {
            console.log(gender);
            return <li key={gender.id}>{gender.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
export default Movie;