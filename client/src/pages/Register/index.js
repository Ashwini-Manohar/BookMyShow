
import React from "react";
import { Button, Form, Input, message , Radio} from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../api/users";

function Register() {
  const [msgApi, contextHolder] = message.useMessage(); // Add this

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      console.log("Backend response:", response);

      if (response.success) msgApi.success(response.message, 3);
      
      else msgApi.error(response.message, 3);
    } catch (err) {
      msgApi.error(err.message, 3);
    }
  };

  return (
    <main className="App-header" style={{ padding: "2rem" }}>
      {contextHolder} {/* This ensures messages are rendered */}
      <h1>Register to BookMyShow</h1>
      <section className="main-area mw-500 text-center px-3">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

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
              Register
            </Button>
          </Form.Item>
          <Form.Item
            label="Register as a Partner"
            // htmlFor="role"
            name="roles"
            className="d-block text-center"
            initialValue={false}
            rules={[{ required: true, message: "Please select an option!" }]}
            >
            <div className="d-flex justify-content-start">
              <Radio.Group name="radiogroup" className="flex-start">
              <Radio value={"partner"}>Yes</Radio>
              <Radio value={"user"}>No</Radio>
              </Radio.Group>
            </div>
          </Form.Item>
        </Form>

        <p>
          Already a user? <Link to="/login">Login now</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
