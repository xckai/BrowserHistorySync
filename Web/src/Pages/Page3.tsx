import React, { PureComponent, version } from 'react';
import { Layout, Button, message, Space, Table, Tag, Input, Rate, DatePicker } from 'antd';
import { PagesComponent } from '../Component/PagesComponent';
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
