import { Link } from "react-router-dom";
import React, { Component }  from 'react';
import {
  UploadOutlined,
  SketchOutlined,
  VideoCameraOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./layout.css";
import { Layout, Menu } from "antd";
import Popcorn from "../../images/icon.png";

const { Header, Content, Footer, Sider } = Layout;

const Transversal = ({ children }) => {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ zIndex: 100 }}
      >
        <Link to="/">
          <div
            className="logo"
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              flexDirection: "column",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <img src={Popcorn} alt="popcorn" height="125px" />
          </div>
        </Link>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<VideoCameraOutlined />}>
            <Link to="/newmovie"> New Movie </Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<SketchOutlined />}>
            <Link to="/pop"> Populares</Link>
          </Menu.Item>

          <Menu.Item key="3" icon={<SearchOutlined />}>
            <Link to="/search"> Search </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0, zIndex: 100 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Transversal;