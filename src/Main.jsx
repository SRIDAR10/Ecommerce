import { React, useEffect, useState } from "react";
import Filter from "./Filter";
import Cards from "./Cards";
import Home from "./Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./images/NS Logo.png";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Checkout from "./Checkout";
import { Button, Flex, Input, Space, Typography } from "antd";
import {
  LogoutOutlined,
  LoginOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
const {Text, Title}=Typography;
const Main = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [currentView,setCurrentView]=useState("home");
  const addToCartInfo = JSON.parse(localStorage.getItem("product")) ?? [];
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  const [info, setInfo] = useState(addToCartInfo);
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const handleViewClick =(view)=>{
    setCurrentView(view);
  }
  const handleQuantity = (action, product) => {
    let productInfo = JSON.parse(localStorage.getItem("product")) || [];
    if (action === "add") {
      productInfo.forEach((item) => {
        if (item.id === product.id) {
          item.quantity = (item.quantity || 0) + 1;
        }
      });
    }
    if (action === "remove") {
      productInfo.forEach((item) => {
        if (item.id === product.id) {
          item.quantity = item?.quantity - 1;
        }
      });
      productInfo = productInfo?.filter((data) => data.quantity !== 0);
    }
    setInfo(productInfo);
    localStorage.setItem("product", JSON.stringify(productInfo));
  };

  const handleCheckout = (addToCartInfo) => {
    if(!isAuthenticated){
      navigate("/login");
      return;
    }
    axios
      .post("http://localhost:3000/create-checkout-session", addToCartInfo)
      .then((response) => {
        console.log("Redirecting to : ", response);
        window.location.href = response.data.redirectUrl;
      });
    console.log(addToCartInfo);
    console.log(JSON.parse(localStorage.getItem("product")) ?? []);
  };
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    setSearchQuery(value);
  };
console.log(isAuthenticated);
  return (

    <main>
      <Flex align="center" className="app-main-header" style={{backgroundColor:"#0F1111", borderRadius:"10px"}}> 
        <span>
          {" "}
          <img src={logo} alt="" width={30} height={30} />
        </span>
        <Input.Search
          onSearch={onSearch}
          // prefix ={<SearchOutlined />}
          className="search-container"
          placeholder="Search for products..."
          style={{ color: "black" }}
          
        />
        <Space className="header-actions">
          <Text onClick={()=>handleViewClick("home") }style={{color:"white", cursor:"pointer"}}>Home</Text>
          <Text style={{color:"white", cursor:"pointer"}} onClick={()=>handleViewClick("shop")}>Shop</Text>
        <Button style={{height:"44px"}} onClick={toggleDrawer} icon={<ShoppingCartOutlined />} >Cart</Button>
        {isAuthenticated  &&
            <Button style={{height:"44px"}} onClick={handleLogout} icon={<LogoutOutlined />}>
                Logout
            </Button>
        } 
        {console.log(isAuthenticated)}
        {!isAuthenticated &&
          <Button style={{height:"44px"}} onClick={handleLogin} icon={<LoginOutlined />}>
            Login
          </Button>
        }
        </Space>
      </Flex>
      {currentView==="home" && <Home />}
      {currentView==="shop" && 
      <div className="app-main-body">
        <Filter
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
        <Cards
          selectedPriceRange={selectedPriceRange}
          selectedBrands={selectedBrands}
          selectedRating={selectedRating}
          searchQuery={searchQuery}
          setInfo={setInfo}
          handleCheckout={handleCheckout}
        />
      </div>
    }
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="drawer"
        size="1000px"
      >
        <div className="drawer-header">
        <h2 className="drawer-title">Add to Cart</h2>
        <Space className="header-actions">
          
          {addToCartInfo.length > 0 && (
            
            <Button type="primary"  onClick={() => {
              if(!isAuthenticated||!isAuthenticated.length){
                navigate("/login");
                return;
              }
              handleCheckout(addToCartInfo);

            } }>
              Buy
            </Button>
            
          )}
          <Button icon={<CloseCircleOutlined />} onClick={() => setIsOpen(false)} className="drawer-close-btn"/>
            </Space>
          
        </div>
        <div className="drawer-body">
          {info?.map((product) => {
            return (
              <div key={product.id} className="flex gap-10">
                <div>
                  <img src={product.image} alt={product.name} />
                </div>
                <Flex vertical gap={6}>
                  <Text strong>{product.product_name}</Text>
                  <Flex align="center" gap={6}>
                    <Button
                      onClick={() => handleQuantity("remove", product)}
                      disabled={!product?.quantity > 0}icon={<MinusCircleOutlined />}
                    />
                    
                    <Text>{product.quantity ?? 1}</Text>
                    <Button icon= {<PlusCircleOutlined />} onClick={() => handleQuantity("add", product)}/>
                  </Flex>
                  <Text>₹{product?.price * product?.quantity}</Text>
                </Flex>
              </div>
            );
          })}
        </div>
      </Drawer>
    </main>
  );
};

export default Main;
