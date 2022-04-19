import React, { PureComponent, version } from 'react';

import { Layout, Button, message, Space, Table, Tag, Input, Rate, DatePicker, List } from 'antd';
import _ from 'lodash';

export function PagesComponent() {
  const pages: any = {
    Page1: '/page1',
    Page2: '/page1',
    Page3: '/page1',
    Index: '/',
    ReduxDemoPage: '/ReduxDemoPage'
  };
  return (
    <List>
      {_.keysIn(pages).map((k) => {
        return (
          <List.Item>
            <a href={pages[k] as any}>{k} </a>
          </List.Item>
        );
      })}
    </List>
  );
}
