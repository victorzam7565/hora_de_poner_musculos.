import { Spin } from "antd";
import "./loading.scss";
const Loading = () => {
  return <Spin className="loading" size="large" tip="Cargando..." />;
};

export default Loading;