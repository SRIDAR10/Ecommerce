import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Flex, Input, Space, Typography, Rate } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  PlusOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import AddCompany from "./AddComapny";
const { Text, Title } = Typography;
const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [openAddProductDrawer, setOpenAddProductDrawer] = useState(false);
  const [openAddCompanyDrawer, setOpenAddCompanyDrawer] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    try {
      const response = axios
        .get("http://localhost:3000/product/get-all-companies")
        .then((data) => {
          console.log(data);
          setCompanies(
            data?.data?.companies?.map((data) => {
              return {
                label: data?.name,
                value: data?._id,
              };
            }) ?? []
          );
        });
    } catch (error) {
      console.error("Error while fetching ", error);
      return null;
    }
  }, []);

  useEffect(() => {
    try {
      const response = axios
        .get("http://localhost:3000/product/get-products")
        .then((data) => {
          console.log(data);
          setProducts(data?.data?.products);
        });
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  }, []);

  const Truncate = (string, number) => {
    if (!string) {
      return null;
    }
    if (string.length <= number) {
      return string;
    }
    return string.slice(0, number) + "...";
  };
  const updateStock = (product_name, stock) => {
    axios.post("http://localhost:3000/product-settings/update-stock", {
      product_name: product_name,
      stock: stock,
    });
  };
  const removeStock = (product) => {
    const updateProduct = products.map((data) => {
      if (product.product_name === data.product_name) {
        let temp = data;
        temp = { ...temp, stock: temp.stock - 1 };
        updateStock(product.product_name, temp.stock);
        return temp;
      }
      return data;
    });
    console.log(updateProduct);
    setProducts(updateProduct);
  };
  const addStock = (product) => {
    const updateProduct = products.map((data) => {
      if (product.product_name === data.product_name) {
        let temp = data;
        temp = { ...temp, stock: temp.stock + 1 };
        updateStock(product.product_name, temp.stock);
        return temp;
      }
      return data;
    });
    console.log(updateProduct);
    setProducts(updateProduct);
  };

  const onClose = () => {
    setOpenAddProductDrawer(false);
  };

  const addCompany = async (values) => {
    try {
      const response = await axios
        .post("http://localhost:3000/product/add-company", {
          name: values,
        })
        .then(() => {
          handleClose();
          const response = axios
            .get("http://localhost:3000/product/get-all-companies")
            .then((data) => {
              console.log(data);
              setCompanies(
                data?.data?.companies?.map((data) => {
                  return {
                    label: data?.name,
                    value: data?._id,
                  };
                }) ?? []
              );
            });
        });
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(values);
  };

  const handleClose = () => {
    setOpenAddCompanyDrawer(false);
  };

  return (
    <>
      <Flex
        align="center"
        style={{
          padding: "16px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Flex gap={10}>
          <Button
            icon={<LeftOutlined />}
            onClick={() => {
              navigate("/");
            }}
          />
          <Title level={3} style={{ margin: 0, padding: 0 }}>
            Admin Settings
          </Title>
        </Flex>
        <Flex gap={10} className="ml-auto mr-20">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenAddProductDrawer(true)}
          >
            Add Product
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenAddCompanyDrawer(true)}
          >
            Add Company
          </Button>
        </Flex>
      </Flex>
      <div className="grid">
        {products &&
          products?.length &&
          products.map((product) => (
            <div className="card" key={product.id}>
              <img alt="PVC Conduit Pipes" src={product.image} />
              <div className="card-body">
                <h5
                  className="card-title"
                  title={
                    product.product_name?.length >= 50
                      ? product?.product_name
                      : null
                  }
                >
                  {Truncate(product.product_name, 55)}
                </h5>
                <div>
                  <strong>{product?.company}</strong>
                </div>
                <p className="card-description">
                  {Truncate(product.description, 55)}
                </p>
                <p className="card-price">₹{product.price}</p>
                <p className="card-rating">
                  <Rate allowHalf value={product.star_rating} disabled={true} />
                </p>
                <Flex align="center" gap={6}>
                  <Button
                    icon={<MinusCircleOutlined />}
                    onClick={() => removeStock(product)}
                    disabled={product.stock === 0}
                  ></Button>
                  <Text>{product?.stock}</Text>
                  <Button
                    icon={<PlusCircleOutlined />}
                    onClick={() => addStock(product)}
                  ></Button>
                </Flex>
              </div>
            </div>
          ))}
      </div>
      <AddProduct
        openDrawer={openAddProductDrawer}
        handleClose={onClose}
        setProducts={setProducts}
        companies={companies}
      />
      <AddCompany
        onSave={addCompany}
        open={openAddCompanyDrawer}
        close={handleClose}
      />
    </>
  );
};

export default Admin;
