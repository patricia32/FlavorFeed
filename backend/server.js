const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "/backend/data", "data.json");
const PORT = Number(process.env.PORT) || 8055;

const app = express();
app.use(express.json());

const allowOrigin = "*";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

async function readProductData() {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeProductData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/restaurants", async (req, res) => {
  try {
    const data = await readProductData();
    res.json(data ?? []);
  } catch (error) {
    console.error("Failed to read products", error);
    res.status(500).json({ error: "Unable to load restaurants." });
  }
});

app.get("/restaurants/:id", async (req, res) => {
  try {
    const data = await readProductData();
    const needle = data.find((r) => r.id === Number(req.params.id));
    res.json(needle ? [needle] : []);
  } catch (error) {
    console.error("Failed to fetch product", error);
    res.status(500).json({ error: "Unable to fetch restaurant." });
  }
});

app.get("/getRestaurant/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id))
      return res.status(400).json({ error: "Invalid restaurant id" });

    const data = await readProductData();
    const restaurant = data.find((r) => r.id === id);

    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Failed to fetch restaurant", error);
    res.status(500).json({ error: "Unable to fetch restaurant." });
  }
});

const validateReviewInput = (userName, content, rating) => {
  const normalizedUserName =
    typeof userName === "string" ? userName.trim() : "";
  const normalizedText = typeof content === "string" ? content.trim() : "";
  const ratingNumber = Number(rating);

  return { normalizedUserName, normalizedText, ratingNumber };
};

app.post("/restaurants/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { userName, content, rating } = req.body || {};

  const { normalizedUserName, normalizedText, ratingNumber } =
    validateReviewInput(userName, content, rating);

  if (!normalizedUserName)
    return res.status(400).json({ error: "User name is required." });

  if (!normalizedText)
    return res.status(400).json({ error: "Review content is required." });

  if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5)
    return res
      .status(400)
      .json({ error: "Rating must be an integer between 1 and 5." });

  try {
    const restaurants = await readProductData();
    const restaurant = restaurants.find((item) => item.id === Number(id));

    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found." });

    if (!Array.isArray(restaurant.reviews)) restaurant.reviews = [];

    const newReview = {
      id: `${id}-review-${Date.now()}`,
      userName: normalizedUserName,
      content: normalizedText,
      rating: ratingNumber,
      timestamp: new Date().toISOString(),
    };

    restaurant.reviews.push(newReview);
    await writeProductData(restaurants);

    const addedReview = restaurant.reviews[restaurant.reviews.length - 1];
    res.status(201).json(addedReview);
  } catch (error) {
    console.error(`Failed to add review for product ${id}`, error);
    res.status(500).json({ error: "Unable to save review." });
  }
});

app.listen(PORT, () => {
  console.log(`Product API listening on port ${PORT}`);
});
