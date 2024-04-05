import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async(values) => {
    console.log('Success:', values);
    const formData={email:values.email, password:values.password}
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      console.log(response.data);
      if(response.data.user){
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isAuthenticated", true);
        navigate("/");
        }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
    
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: ''
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  // };

  return (
    <div className='container'>
      
      {/* <form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button className='butto' type="submit">Login</button>
       
      </form> */}
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
  <p>Don't have an Account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
