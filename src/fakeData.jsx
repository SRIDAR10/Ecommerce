import axios from "axios";

const fakeData = [
  {
    id: 1,
    title: "PVC Pipe 1",
    description: "High-quality PVC pipe for plumbing applications.",
    image: "https://via.placeholder.com/150",
    price: 10.99,
    brand: "Taptree",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Copper Pipe 1",
    description: "Durable copper pipe suitable for various uses.",
    image: "https://via.placeholder.com/150",
    price: 15.99,
    brand: "Prince",
    rating: 4.2,
  },
  {
    id: 3,
    title: "Steel Pipe 1",
    description: "Strong steel pipe for industrial applications.",
    image: "https://via.placeholder.com/150",
    price: 20.99,
    brand: "MLOP",
    rating: 4.0,
  },
];

const fetchRandomImage = async () => {
  try {
    const response = await axios.get("https://picsum.photos/200/300");
    return response.request.responseURL; // Get the URL of the fetched image
  } catch (error) {
    console.error("Error fetching image:", error);
    return null; // Return null if there's an error fetching the image
  }
};
for (let i = 4; i <= 100; i++) {
  fakeData.push({
    id: i,
    title: `Pipe ${i}`,
    description: `Description for Pipe ${i}`,
    image: fetchRandomImage,
    price: Math.floor(Math.random() * 50) + 1,
    brand: [
      "Taptree",
      "Prince",
      "MLOP",
      "Spazio",
      "Rigwell Lifetime",
      "AC Engineers",
    ][Math.floor(Math.random() * 6)],
    rating: (Math.random() * (5 - 2) + 2).toFixed(1),
  });
}
export default fakeData;
