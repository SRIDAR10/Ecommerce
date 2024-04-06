function Filter({
  setSelectedPriceRange,
  selectedPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedRating,
  setSelectedRating,
}) {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedPriceRange([...selectedPriceRange, value]);
    } else {
      setSelectedPriceRange(
        selectedPriceRange.filter((item) => item !== value),
      );
    }
  };
  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrands([...selectedBrands, value]);
    } else {
      setSelectedBrands(selectedBrands.filter((item) => item !== value));
    }
  };
  const handleRatingChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRating([...selectedRating, value]);
    } else {
      setSelectedRating(selectedRating.filter((item) => item !== value));
    }
  };
  return (
    <aside className="filter">
      <h4>Price ({selectedPriceRange ? selectedPriceRange?.length : 0})</h4>
      <label>
        <input
          type="checkbox"
          value="1-19"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("1-19")}
        />{" "}
        ₹1 - ₹19
      </label>
      <label>
        <input
          type="checkbox"
          value="20-23"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("20-23")}
        />{" "}
        ₹20 - ₹23
      </label>
      <label>
        <input
          type="checkbox"
          value="24-27"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("24-27")}
        />{" "}
        ₹24 - ₹27
      </label>
      <label>
        <input
          type="checkbox"
          value="28-30"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("28-30")}
        />{" "}
        ₹28 - ₹30
      </label>
      {/* <label>
        <input
          type="checkbox"
          value="5001-10000"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("5001-10000")}
        />{" "}
        ₹5001 - ₹10000
      </label>
      <label>
        <input
          type="checkbox"
          value="10001-*"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("10001-*")}
        />{" "}
        ₹10001 - *
      </label> */}
      <h4>Brand ({selectedBrands ? selectedBrands?.length : 0})</h4>
      <label>
        <input
          type="checkbox"
          value="Astral"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Astral")}
        />{" "}
        Astral
      </label>
      <label>
        <input
          type="checkbox"
          value="Finolex"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Finolex")}
        />{" "}
        Finolex
      </label>
      <label>
        <input
          type="checkbox"
          value="Supreme"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Supreme")}
        />{" "}
        Supreme
      </label>
      <label>
        <input
          type="checkbox"
          value="Prince"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Prince")}
        />{" "}
        Prince
      </label>
      <label>
        <input
          type="checkbox"
          value="Raksha"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Raksha")}
        />{" "}
        Raksha
      </label>
      <label>
        <input
          type="checkbox"
          value="Ashirvad"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Ashirvad")}
        />{" "}
        Ashirvad
      </label>
      <label>
        <input
          type="checkbox"
          value="Sudhakar"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Sudhakar")}
        />{" "}
        Sudhakar
      </label> <label>
        <input
          type="checkbox"
          value="Jain"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Jain")}
        />{" "}
        Jain 
      </label>

      <h4>Ratings ({selectedRating ? selectedRating?.length : 0})</h4>
      <label>
        <input
          type="checkbox"
          value="4.0"
          onChange={handleRatingChange}
          checked={selectedRating.includes("4.0")}
        />{" "}
        4 & above
      </label>
      <label>
        <input
          type="checkbox"
          value="3.0"
          onChange={handleRatingChange}
          checked={selectedRating.includes("3.0")}
        />{" "}
        3 & above
      </label>
      <label>
        <input
          type="checkbox"
          value="2.0"
          onChange={handleRatingChange}
          checked={selectedRating.includes("2.0")}
        />{" "}
        2 & above
      </label>
    </aside>
  );
}

export default Filter;
