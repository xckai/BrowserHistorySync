import React, { createRef } from "react";
import { StopOutlined } from "@ant-design/icons";

import { Form, Input, InputRef, message, Modal } from 'antd';
import {
  AxiosError,
  default as axios
} from 'axios';
axios.defaults.baseURL = window.syncManagerConfig?.dataServerUrl ?? "";
axios.defaults.withCredentials = true;

let loginModalIsVisable = false;
let password = "";
const inputValueRef = createRef<any>();
axios.interceptors.response.use(resp => resp, (error: AxiosError<any>) => {
  const resp = error.response;
  if (resp) {
    switch (resp.status) {
      case 400: {
        message.error(resp.data ?? error.message);
        return Promise.reject(error);
      }
      case 401: {
        if (loginModalIsVisable)
          return Promise.reject(error);

        Modal.confirm({
          title: "授权失败，请重新登录",
          okText: "登录",
          closable: false,
          cancelButtonProps: { hidden: true },
          onCancel: () => { window.location.reload() },
          content: (
            <Form
              css={`margin-top:3rem;`}>
              <Form.Item label="请输入密码" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input
                  ref={inputValueRef}
                  onChange={({ target: { value } }) => {
                    password = value;
                  }}
                  type={"password"}
                />
              </Form.Item>
            </Form>

          ),
          icon: <StopOutlined style={{ color: '#ed1506' }} />,
          onOk: () => new Promise((res, rej) => {
            new BaseAuthAxiosService().login(password).then(resp => {
              res("ok")
              window.location.reload();
            }).catch(err => { rej(false) })
            inputValueRef.current.value = '';

          })
        });
        return Promise.reject(error);
      }
      default: {
        message.error(resp?.data ?? error.message);
        return Promise.reject(error);
      }
    }
  }
  message.error(resp?.data ?? error.message);
  return Promise.reject(error);
});
export class BaseAuthAxiosService {
  axiosClient = axios
  login(secret: string) {
    return axios.post("api/Auth/login", `secret=${secret}`)
  }
  logout() {
    return axios.post("api/Auth/logout").then(res => {
      message.info("成功登出，您可以关闭该页面");
    })
  }
}
export const baseAuthAxiosService = new BaseAuthAxiosService();
