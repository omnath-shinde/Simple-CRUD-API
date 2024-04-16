// download express and nodemon, monoose, dotenv
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel.js");

// middle ware
app.use(express.json());

app.get("/", (request, response) => {
    response.send("Hello from Node API Sever Updated");
});

// get all products
app.get("/api/products", async (request, response) => {
    try {
        const products = await Product.find({});
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// get a product by id
app.get("/api/product/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const products = await Product.findById(id);
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// add a product
app.post("/api/products", async (request, response) => {
    try {
        const product = await Product.create(request.body);
        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// update a product
app.put("/api/product/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const product = await Product.findByIdAndUpdate(id, request.body);

        if (!product) {
            return response.status(404).json({ message: "Product Not Found" });
        }

        const updateProduct = await Product.findById(id);
        response.status(200).json(updateProduct);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

// delete a product
app.delete("/api/product/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return response.status(404).json({ message: "Product Not Found" });
        }

        response.status(200).json({
            message: "Product deleted",
        });
    } catch {
        response.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
// mongoose.connect("connection-string - /Node-API?")
mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("Connected to database!");
        app.listen(PORT, () => {
            console.log("server is running on port: 3000");
        });
    })
    .catch(() => {
        console.log("Connection failed");
    });
