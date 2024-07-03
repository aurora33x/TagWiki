import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Layout, message, Row, Typography } from "antd";
import axios from "axios";
import Cookies from 'js-cookie';
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserContext from "../components/UserContext";
import "./LoginPage.css";

const { Title } = Typography;

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useContext(UserContext);
  const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_SERVER_BASE_URL;

  function login() {
    const data = { username, password };
    if (!username) return message.error('Please enter username');
    if (!password) return message.error('Please enter password');

    axios.post(`${base_url}/auth/login`, data)
      .then((response) => {
        const { token } = response.data; // Assuming token is returned in response
        if (token) {
          Cookies.set('token', token); // Store token securely
          user.setToken(token); // Update user context with token
          navigate("/");
        } else {
          message.error('Login failed. No token received.');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          message.error('Invalid username or password');
          console.log(error.response);
        } else {
          message.error('Login failed. Please try again later.');
        }
      });
  }

  return (
    <Layout>
      <Navbar />
      <Row>
        <Col span={9} offset={6}>
          <Card
            bordered={false}
            className="login-page"
            title={<Title level={3}>Log In</Title>}
          >
            <Input
              size="large"
              placeholder="Username"
              prefix={<UserOutlined />}
              style={{ width: "80%" }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <br />
            <br />
            <Input
              type="password"
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
              style={{ width: "80%" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <br />
            <br />
            <Button
              type="primary"
              size="large"
              id="login-button"
              onClick={login}
            >
              LOGIN
            </Button>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default LoginPage;