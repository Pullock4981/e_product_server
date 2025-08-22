# E-Products Server

A simple **Express.js backend** for managing products in an e-commerce style application.  
Supports adding products (without images), fetching all products, and testing MongoDB connection.  

---

## Table of Contents

- [Features](#features)  
- [Technologies](#technologies)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [API Routes](#api-routes)  
- [Usage](#usage)  
- [License](#license)  

---

## Features

- Add a new product with **name, price, and description**.  
- Optional image upload via **Cloudinary** (currently removed for simplicity).  
- Fetch all products.  
- Ping MongoDB to test connection.  
- CORS enabled for frontend integration.  

---

## Technologies

- Node.js  
- Express.js  
- MongoDB (MongoDB Atlas)  
- Cloudinary (optional for image upload)  
- Multer  
- dotenv  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/e_products_server.git
Install dependencies:

bash
Copy
Edit
cd e_products_server
npm install
Create a .env file in the root directory:

bash
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Start the server:

bash
Copy
Edit
node index.js
The server will run on http://localhost:5000.

Environment Variables
Variable	Description
PORT	Port number for the server (default: 5000)
MONGO_URI	MongoDB connection URI
CLOUDINARY_CLOUD_NAME	Cloudinary cloud name (optional)
CLOUDINARY_API_KEY	Cloudinary API key (optional)
CLOUDINARY_API_SECRET	Cloudinary API secret (optional)

API Routes
Root
sql
Copy
Edit
GET /
Returns a message confirming the API is running.

Add Product
bash
Copy
Edit
POST /products
Body (JSON):

json
Copy
Edit
{
  "name": "Product Name",
  "price": 100,
  "description": "Product description"
}
Response:

json
Copy
Edit
{
  "message": "Product added successfully",
  "product": {
    "_id": "unique_product_id",
    "name": "Product Name",
    "price": 100,
    "description": "Product description",
    "createdAt": "2025-08-22T10:00:00.000Z"
  }
}
Get All Products
bash
Copy
Edit
GET /products
Returns an array of all products in the database.

Ping MongoDB
bash
Copy
Edit
GET /ping
Checks MongoDB connection and returns a success message.
