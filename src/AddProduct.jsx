import React, { useEffect, useState } from "react";
import { Form, Input, Image, Button, message, Drawer, Select } from "antd";
import axios from "axios";

import "./ProductForm.css";

const layout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 16 },
};

const AddProduct = ({ openDrawer, handleClose, setProducts, companies }) => {
  const [form] = Form.useForm();
const getRandomNumber = () => {
    // Generate a random number between 0 and 4
    const randomNumber = Math.floor(Math.random() * 5);
    // Add 1 to the random number to shift the range to 1-5
    return randomNumber + 1;
  };
  const onFinish = async (values) => {
    console.log(values);
    console.log(companies?.find((data) => data.value === values.company));
    try {
      const formData = {
        company: companies?.find((data) => data.value === values.company)
          ?.label,

        company_id: companies?.find((data) => data.value === values.company)
          ?.value,

        product_name: values.product_name,
        image: values?.image,
        description: values.description,
        price: Number(values?.price),
        stock: Number(values?.stock),
        star_rating: Number(getRandomNumber())
      };
      try {
        const response = await axios
          .post("http://localhost:3000/product/add-product", formData)
          .then(() => {
            handleClose();
            axios
              .get("http://localhost:3000/product/get-products")
              .then((data) => {
                console.log(data);
                setProducts(data?.data?.products);
              });
          });
      } catch (error) {
        console.error("Error:", error);
      }
      message.success("Product saved successfully.");
      form.resetFields();
    } catch (error) {
      message.error("Error saving product.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Drawer
      open={openDrawer}
      onClose={handleClose}
      title="Add Product"
      styles={{
        wrapper: {
          width: "40%",
        },
      }}
    >
      <Form
        {...layout}
        form={form}
        layout="vertical"
        className="add-product-form"
        name="product-form"
        onFinish={onFinish}
        labelAlign="left"
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Company"
          name="company"
          rules={[
            { required: true, message: "Please input the company name." },
          ]}
        >
          <Select options={companies} />
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="product_name"
          rules={[
            { required: true, message: "Please input the product name." },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="image"
          rules={[{ required: true, message: "Please input the image URL." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the product description.",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input the product price." },
          ]}
        >
          <Input type="number" min={0} addonBefore="₹" />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Please input the stock count." }]}
        >
          <Input type="number" min={0} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddProduct;
