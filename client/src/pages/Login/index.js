
import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from '../../api/users';

function Login() {
  const navigate = useNavigate();
  const [msgApi, contextHolder] = message.useMessage(); // Add this

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await LoginUser(values);
      console.log("Backend response:", response);

      if (response.success) {
        msgApi.success(response.message, 3); // Show success popup
        localStorage.setItem('token', response.data);
        localStorage.setItem("roles",response.roles);
        navigate('/'); // Navigate only on successful login
        
      } else {
        msgApi.error(response.message, 3); // Show error popup
      }
    } catch (error) {
      msgApi.error(error.response?.data?.message || "Something went wrong", 3);
    }
  };

  return (
    <main className="App-header" style={{ padding: "2rem" }}>
      {contextHolder} {/* This is required for the messages to render */}
      <h1>Login to BookMyShow</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder="Enter your Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <p>
          New User? <Link to="/register">Register Here</Link>
        </p>
        <p>
          Forgot Password? <Link to="/forget">Click Here</Link>
</p>

      </section>
    </main>
  );
}

export default Login;
