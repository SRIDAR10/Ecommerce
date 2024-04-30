import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import login from "./images/login.jpg";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const formData = {
      name: values.name,
      email: values.email,
      password: values.password,
      address: values.address,
      zipcode: values.zipcode,
      city: values.city,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/sign-up",
        formData
      );
      console.log(response.data);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isAuthenticated", true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <img src={login} alt="Registration" />
      </div>
      <div className="register-form">
        <h2 className="reg-heading">SIGNUP</h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Zip code"
            name="zipcode"
            rules={[{ required: true, message: "Please input your zip code!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
