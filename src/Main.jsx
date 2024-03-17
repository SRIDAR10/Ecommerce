import { React, useEffect, useState } from "react";
import Filter from "./Filter";
import Cards from "./Cards";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Checkout from "./Checkout";

const Main = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const addToCartInfo = JSON.parse(localStorage.getItem("product")) ?? [];
  const [info, setInfo] = useState(addToCartInfo);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

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

  const handleCheckout = () => {
    axios
      .post("http://localhost:3000/create-checkout-session", addToCartInfo)
      .then((response) => {
        console.log("Redirecting to:", response);
        window.location.href = response.data.redirectUrl;
      });
  };

  return (
    <main>
      <header className="app-main-header">
        <span>E-commerce</span>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-container"
          placeholder="Search for products..."
        />
        <button onClick={toggleDrawer}>Cart</button>
      </header>
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
        />
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="drawer"
        size="1000px"
      >
        <div className="drawer-header">
          <h2 className="drawer-title">Add to Cart</h2>
          {addToCartInfo.length > 0 && (
            <button onClick={handleCheckout}>Checkout</button>
          )}
          <button onClick={() => setIsOpen(false)} className="drawer-close-btn">
            x
          </button>
        </div>
        <div className="drawer-body">
          {info?.map((product) => {
            return (
              <div key={product.id} className="flex gap-10">
                <div>
                  <img src={product.image} alt={product.name} />
                </div>
                <div>
                  <p>{product.title}</p>
                  <div className="flex">
                    <button
                      onClick={() => handleQuantity("remove", product)}
                      disabled={!product?.quantity > 0}
                    >
                      -
                    </button>
                    <p>{product.quantity ?? 1}</p>
                    <button onClick={() => handleQuantity("add", product)}>
                      +
                    </button>
                  </div>
                  <p>₹{product?.price * product?.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Drawer>
    </main>
  );
};

export default Main;
