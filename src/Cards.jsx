import { useEffect, useState } from "react";
import fakeData from "./fakeData";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Flex, Modal, Typography, Rate } from "antd";
import { Card } from "antd";
import axios from "axios";
const { Text } = Typography;
const Cards = ({
  selectedPriceRange,
  selectedBrands,
  selectedRating,
  searchQuery,
  setInfo,
  handleCheckout,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [selectedCard, setSelectedCard] = useState(false);
  const onCardClick = (product) => {
    setSelectedCard(product);
    setIsModalOpen(true);
  };
  console.log(selectedPriceRange);
  const [products, setProducts] = useState([]);
  const brandFilter = (product) => {
    if (!selectedBrands.length) {
      return true;
    }
    if (selectedBrands.length > 0 && selectedBrands.includes(product.company)) {
      return true;
    }
    return false;
  };

  const ratingFilter = (product) => {
    if (!selectedRating.length) {
      return true; // If no ratings are selected, return all products
    }
    // Check if any of the selected ratings are less than or equal to the product's rating
    return selectedRating.some(
      (rating) => parseFloat(product.star_rating) >= parseFloat(rating)
    );
  };

  const amountRangeFilter = (product) => {
    if (!selectedPriceRange.length) {
      return true;
    }
    if (selectedPriceRange.length > 0) {
      return selectedPriceRange.some((range) => {
        const [min, max] = range.split("-");
        return (
          product.price >= parseFloat(min) && product.price <= parseFloat(max)
        );
      });
    }
  };

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
      return null; // Return null if there's an error fetching the image
    }
  }, []);
  useEffect(() => {
    const filtered =
      products &&
      products?.length &&
      products?.filter((product) => {
        if (
          amountRangeFilter(product) &&
          ratingFilter(product) &&
          brandFilter(product)
        ) {
          return product;
        }
      });

    setFilteredProducts(filtered);
  }, [selectedPriceRange, selectedBrands, selectedRating, products]);

  const Truncate = (string, number) => {
    if (!string) {
      return null;
    }
    if (string.length <= number) {
      return string;
    }
    return string.slice(0, number) + "...";
  };
  // console.log(
  //   "search==========",
  //   filteredProducts?.filter((product) =>
  //     product?.title.toLowerCase().includes(searchQuery.toLowerCase()),
  //   ),
  // );

  const handleAddToCart = (product) => {
    let productInfo = JSON.parse(localStorage.getItem("product")) || [];
    let foundDuplicate = false;

    productInfo.forEach((item) => {
      if (item.id === product.id) {
        item.quantity = (item.quantity || 0) + 1;
        foundDuplicate = true;
      }
    });

    if (!foundDuplicate) {
      productInfo.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("product", JSON.stringify(productInfo));
    setInfo(productInfo);
  };

  return (
    <section className="product">
      <div className="grid">
        {filteredProducts &&
          filteredProducts?.length &&
          filteredProducts
            .filter((product) =>
              product?.product_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <div
                className="card"
                onClick={() => onCardClick(product)}
                key={product.id}
              >
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
                  <p className="card-rating"> <Rate allowHalf value={product.star_rating} disabled={true}/></p>
                  <p>Available stock : {product.stock}</p>
                  <Flex gap={6}>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      style={{ backgroundColor: "#FFDE00" }}
                      icon={<ShoppingCartOutlined />}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => handleCheckout([product])}
                      style={{ backgroundColor: "orange" }}
                    >
                      Buy Now
                    </Button>
                  </Flex>
                </div>
              </div>
            ))}
        <Modal
          title={<Text> {selectedCard?.product_name} </Text>}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              onClick={() => handleAddToCart(selectedCard)}
              style={{ backgroundColor: "#FFDE00" }}
              icon={<ShoppingCartOutlined />}
            >
              Add to Cart
            </Button>,
            <Button
              onClick={() => handleCheckout([selectedCard])}
              style={{ backgroundColor: "orange" }}
            >
              Buy Now
            </Button>,
          ]}
        >
          <Flex vertical>
            <div className="modal-parentimg">
              <img
                className="modal-img"
                alt="PVC Conduit Pipes"
                src={selectedCard.image}
              />
            </div>
            <Flex className="width-full">
              <Text strong className="width-18-5">
                Brand :{" "}
              </Text>
              <Text className="width-50 text-align-left">
                {" "}
                {selectedCard?.company}{" "}
              </Text>
            </Flex>
            <Flex className="width-full">
              <Text strong className="width-50">
                Description :{" "}
              </Text>
              <Text> {selectedCard?.description} </Text>
            </Flex>
            <Flex className="width-full">
              <Text strong className="width-18-5">
                Price :{" "}
              </Text>
              <Text> ₹{selectedCard?.price} </Text>
            </Flex>
            <Flex className="width-full">
              <Text strong className="width-18-5">
                Rating :{" "}
              </Text>
              <Text>
                {" "}
                <Rate allowHalf value={selectedCard.star_rating} disabled={true}/>
              </Text>
            </Flex>
          </Flex>
        </Modal>
      </div>
    </section>
  );
};

export default Cards;
