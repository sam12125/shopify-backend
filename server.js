const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 5000; // Change if needed

// Shopify API Configuration
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const SHOPIFY_API_URL = "https://check150.myshopify.com/admin/api/2023-01/metafields.json";

// Middleware
app.use(cors()); // Allow requests from different origins
app.use(express.json()); // Parse JSON request bodies

// Endpoint to Fetch Metafields
app.get("/metafields", async (req, res) => {
  try {
    const response = await axios.get(SHOPIFY_API_URL, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
    });
    res.json(response.data); // Send the data back to the client
  } catch (error) {
    console.error("Error fetching metafields:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch metafields" });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
