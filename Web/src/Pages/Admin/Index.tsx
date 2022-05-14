import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HistoryOutlined,
  FilterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import logo from "src/assets/icon128.png";
import BrowserHistoryManager from "./BrowserHistoryManager";
import FilterRuleManager from "./FilterRuleManager";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminBreadcrumb from "./AdminBreadcrumb";
const { Header, Sider, Content } = Layout;
const StyledLayout = styled(Layout)`
  height: 100vh;
  width: 100vw;
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 1.5rem;
      width: 1.5rem;
    }
    span {
      font-size: 90%;
      font-weight: bold;
      letter-spacing: 0.0625em;
      color: #eee;
    }

    margin: 16px;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
  .site-layout {
    .header {
      display: flex;
      align-items: center;
    }
  }
`;
export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.document.title = "BrowserHistorySync Admin";
  }, []);
  return (
    <StyledLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={logo} alt="" />
          {!collapsed && <span>BrowserHistorySync</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HistoryOutlined />,
              label: "浏览历史管理",
              onClick: () => {
                navigate("./browserHistory");
              },
            },
            {
              key: "2",
              icon: <FilterOutlined />,
              label: "过滤规则配置",
              onClick: () => {
                navigate("./filterRule");
              },
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background header"
          style={{ padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <AdminBreadcrumb></AdminBreadcrumb>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            overflow: "auto",
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="browserHistory" element={<BrowserHistoryManager />} />
            <Route path="filterRule" element={<FilterRuleManager />} />
            <Route path="" element={<BrowserHistoryManager />} />
          </Routes>
        </Content>
      </Layout>
    </StyledLayout>
  );
}
