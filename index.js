require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

// ================= CONFIG =================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "productDB";

// ================= EXPRESS APP =================
const app = express();
app.use(cors());
app.use(express.json());

// ================= MONGODB CONNECTION =================
const client = new MongoClient(MONGO_URI);
let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db(DB_NAME);
        console.log("✅ Connected to MongoDB:", DB_NAME);
    }
    return db;
}

// ================= ROUTES =================

// Root
app.get("/", (req, res) => {
    res.send("🚀 API is running! Use /products to GET or POST products");
});

// Add new product (no image)
app.post("/products", async (req, res) => {
    try {
        const database = await connectDB();
        const collection = database.collection("products");

        const { name, price, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required" });
        }

        const newProduct = {
            name,
            price: parseFloat(price),
            description: description || "",
            createdAt: new Date(),
        };

        await collection.insertOne(newProduct);
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add product" });
    }
});

// Get all products
app.get("/products", async (req, res) => {
    try {
        const database = await connectDB();
        const collection = database.collection("products");
        const products = await collection.find({}).sort({ createdAt: -1 }).toArray();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch products" });
    }
});

// Ping MongoDB
app.get("/ping", async (req, res) => {
    try {
        const database = await connectDB();
        await database.command({ ping: 1 });
        res.send("✅ Pinged MongoDB successfully!");
    } catch (err) {
        res.status(500).send("❌ MongoDB connection failed");
    }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
