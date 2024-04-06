import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
const Register = () => {
  const navigate = useNavigate();
  const onFinish = async(values) => {
    console.log('Success:', values);
    const formData={name:values.name, email:values.email, password:values.password}
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
    console.log('Failed:', errorInfo);
  };
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/sign-up",
  //       formData
  //     );
  //     console.log(response.data);
  //     if (response.data) {
  //       localStorage.setItem("user", JSON.stringify(response.data));
  //       localStorage.setItem("isAuthenticated", true);
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //};

  return (
    <div className="containers">
      {/* <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="buto" type="submit">
          Register
        </button>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </form> */}
      {<h2 className="reg-heading">SIGNUP</h2>}
      <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
     <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
    
  </Form>
  <p>Have an Account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
