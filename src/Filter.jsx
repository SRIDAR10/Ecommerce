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
          value="1-500"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("1-500")}
        />{" "}
        ₹1 - ₹500
      </label>
      <label>
        <input
          type="checkbox"
          value="501-1000"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("501-1000")}
        />{" "}
        ₹501 - ₹1000
      </label>
      <label>
        <input
          type="checkbox"
          value="1001-2500"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("1001-2500")}
        />{" "}
        ₹1001 - ₹2500
      </label>
      <label>
        <input
          type="checkbox"
          value="2501-5000"
          onChange={handleCheckboxChange}
          checked={selectedPriceRange.includes("2501-5000")}
        />{" "}
        ₹2501 - ₹5000
      </label>
      <label>
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
      </label>
      <h4>Brand ({selectedBrands ? selectedBrands?.length : 0})</h4>
      <label>
        <input
          type="checkbox"
          value="Taptree"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Taptree")}
        />{" "}
        Taptree
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
          value="MLOP"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("MLOP")}
        />{" "}
        MLOP
      </label>
      <label>
        <input
          type="checkbox"
          value="Spazio"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Spazio")}
        />{" "}
        Spazio
      </label>
      <label>
        <input
          type="checkbox"
          value="Rigwell-Lifetime"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("Rigwell-Lifetime")}
        />{" "}
        Rigwell Lifetime
      </label>
      <label>
        <input
          type="checkbox"
          value="AC-Engineers"
          onChange={handleBrandChange}
          checked={selectedBrands.includes("AC-Engineers")}
        />{" "}
        AC Engineers
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
