import { Row, Button, Col } from "antd";
import Loading from "../Loading";
const Pagination = ({ isPreviousData, isFetching, page, changePage }) => {
  return (
    <Row>
      <span>Current Page: {page}</span>
      <Col span="24">
        <Button
          type="primary"
          size="large"
          onClick={() => changePage((oldstate) => Math.max(oldstate - 1, 0))}
          disabled={page === 1}
          style={{ marginRight: "2em" }}
        >
          Pagina Previa
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => changePage((oldstate) => oldstate + 1)}
          disabled={isPreviousData}
          style={{ marginRight: "2em" }}
        >
          Pagina Siguiente
        </Button>
        {isFetching ? <Loading /> : null}
      </Col>
    </Row>
  );
};

export default Pagination;