import { useEffect, useState } from "react";
import fakeData from "./fakeData";

const Cards = ({
  selectedPriceRange,
  selectedBrands,
  selectedRating,
  searchQuery,
  setInfo
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(selectedPriceRange);

  const brandFilter = (product) => {
    if (!selectedBrands.length) {
      return true;
    }
    if (selectedBrands.length > 0 && selectedBrands.includes(product.brand)) {
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
      (rating) => parseFloat(product.rating) >= parseFloat(rating),
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
    const filtered = fakeData.filter((product) => {
      if (
        amountRangeFilter(product) &&
        ratingFilter(product) &&
        brandFilter(product)
      ) {
        return product;
      }
    });

    setFilteredProducts(filtered);
  }, [selectedPriceRange, selectedBrands, selectedRating]);

  const Truncate = (string, number) => {
    if (!string) {
      return null;
    }
    if (string.length <= number) {
      return string;
    }
    return string.slice(0, number) + "...";
  };
  console.log(
    "search==========",
    filteredProducts.filter((product) =>
      product?.title.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

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
        {filteredProducts
          .filter((product) =>
            product?.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <div className="card-body">
                <h5
                  className="card-title"
                  title={product.title.length >= 50 ? product.title : null}
                >
                  {Truncate(product.title, 55)}
                </h5>
                <div>
                  <strong>{product?.brand}</strong>
                </div>
                <p className="card-description">
                  {Truncate(product.description, 55)}
                </p>
                <p className="card-price">₹{product.price}</p>
                <p className="card-rating">{product.rating}</p>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Cards;
