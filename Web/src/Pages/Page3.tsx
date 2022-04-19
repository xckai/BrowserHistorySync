import React, { PureComponent, version } from "react";
import { Button, DatePicker } from "antd";
import { PagesComponent } from "../Components/PagesComponent";
export default function Page3() {
  return (
    <>
      <h1>antd version: {version}</h1>
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button Page3
      </Button>
      <PagesComponent />
    </>
  );
}
