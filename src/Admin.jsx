import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Button, Flex, Input, Space, Typography } from "antd";
import {
 
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
const {Text, Title}=Typography;
const Admin = () => {
    
    const[products,setProducts]=useState();
    useEffect(() =>{
        try {
          const response = axios.get("http://localhost:3000/product/get-products").then((data)=>{
            console.log(data);
            setProducts(data?.data?.products);
          });
          
        } catch (error) {
          console.error("Error fetching image:", error);
          return null; // Return null if there's an error fetching the image
        }
    
      },[]);
      
      const Truncate = (string, number) => {
        if (!string) {
          return null;
        }
        if (string.length <= number) {
          return string;
        }
        return string.slice(0, number) + "...";
      };
      const updateStock = (product_name,stock) =>{
        axios.post("http://localhost:3000/product-settings/update-stock",{"product_name":product_name,"stock":stock})
      };
      const removeStock =(product) => {
        const updateProduct = products.map((data) =>{
            if(product.product_name===data.product_name){
                let temp= data;
                temp={...temp,stock:temp.stock-1};
                updateStock(product.product_name,temp.stock);
                return temp;
            }
            return data;
        });
        console.log(updateProduct);
        setProducts(updateProduct);
      };
      const addStock =(product) => {
        const updateProduct = products.map((data) =>{
            if(product.product_name===data.product_name){
                let temp= data;
                temp={...temp,stock:temp.stock+1};
                updateStock(product.product_name,temp.stock);
                return temp;
            }
            return data;
        });
        console.log(updateProduct);
        setProducts(updateProduct);

      };
  return (
    <div className="grid">
        {products && products?.length && products
          .map((product) => (
            <div className="card" key={product.id}>
              <img alt="PVC Conduit Pipes" src={product.image} />
              <div className="card-body">
                <h5
                  className="card-title"
                  title={product.product_name?.length >= 50 ? product?.product_name : null}
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
                <p className="card-rating">{product.star_rating}</p>
                <Flex align="center" gap={6}>
                <Button icon= {<MinusCircleOutlined />}  onClick={()=> removeStock(product)} disabled={product.stock===0} ></Button>
                <Text>{product?.stock}</Text>
                <Button icon= {<PlusCircleOutlined />}  onClick={() => addStock(product)}></Button>
                </Flex>
              </div>
            </div>   
          
          ))}
      </div>
  )
}

export default Admin
