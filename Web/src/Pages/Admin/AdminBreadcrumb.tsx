import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Menu } from "antd";

export default function AdminBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbNameMap: Record<string, string> = {
    "/admin/browserHistory": "浏览历史管理",
    "/admin/filterRule": "过滤规则配置",
  };
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb separator="">{breadcrumbItems}</Breadcrumb>;
}
