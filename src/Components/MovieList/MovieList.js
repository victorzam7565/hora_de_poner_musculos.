import { Avatar, Button, Table, Tag, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { StepForwardOutlined } from "@ant-design/icons";
import "./movielist.scss";

const { Title, Text } = Typography;
const MovieList = ({ title, movies }) => {
  //construimos las columnas
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => {
        return (
          <Space>
            <Avatar src={text} />
          </Space>
        );
      },
    },
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
      render: (text) => {
        return (
          <Space>
            <Text color="green">{text}</Text>
          </Space>
        );
      },
    },
    {
      title: "Votacion",
      dataIndex: "votacion",
      key: "votacion",
      render: (text) => {
        return (
          <Space>
            {text >= 8 ? (
              <Tag color="green">{text}</Tag>
            ) : text <= 7 || text > 3 ? (
              <Tag color="purple">{text}</Tag>
            ) : (
              <Tag color="red">{text}</Tag>
            )}
          </Space>
        );
      },
    },
    {
      title: "Liga",
      dataIndex: "liga",
      key: "liga",
      render: (id, record) => {
        return (
          <Space>
            <Link to={`/movie/${id}`}>
              <Button
                type="primary"
                size="large"
                shape="circle"
                icon={<StepForwardOutlined />}
              ></Button>
            </Link>
          </Space>
        );
      },
    },
  ];
  //construimos el objeto de datos en base a movies
  const data = movies.map((movie) => {
    const posterPath = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    return {
      key: movie.id,
      titulo: movie.title,
      votacion: movie.vote_average,
      liga: movie.id,
      avatar: posterPath,
    };
  });
  return (
    <section style={{ marginTop: "2em" }}>
      <Title>{title}</Title>
      <Table columns={columns} dataSource={data} bordered />
    </section>
  );
};

export default MovieList;