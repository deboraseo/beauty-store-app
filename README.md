# Beauty Store - Backend API

> RESTful API for the Beauty Store e-commerce platform

This is the backend API for the Beauty Store application, developed as part of my final project during the Ironhack Web Development Bootcamp in 2021.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt
- **File Upload**: Cloudinary with Multer
- **CORS**: Enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
```bash
git clone git@github.com:deboraseo/beauty-store-app.git
cd beauty-store-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

4. Seed the database:
```bash
node seeds/seed.js
```

5. Start the server:
```bash
npm start
```

The API will be running at `http://localhost:3001`

## 📚 API Documentation

### Base URL
```
http://localhost:3001
```

### Authentication
Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Public Endpoints

### Authentication - User

#### Register User
```http
POST /user-auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response:** `201 Created`
```json
{
  "name": "John Doe"
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields
- `409 Conflict` - Email or username already exists

---

#### Login User
```http
POST /user-auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response:** `200 OK`
```json
{
  "msg": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Missing email or password
- `404 Not Found` - Email not found
- `401 Unauthorized` - Invalid credentials

---

### Products

#### Get All Products
```http
GET /product/all
```

**Success Response:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Moisturizing Cream",
    "description": "Hydrating face cream",
    "price": 29.99,
    "category": "skincare",
    "image_one": "https://cloudinary.com/...",
    "reviews": ["review_id_1", "review_id_2"]
  }
]
```

---

#### Get Single Product
```http
GET /product/:productId
```

**URL Parameters:**
- `productId` - Product ID

**Success Response:** `200 OK`
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Moisturizing Cream",
  "description": "Hydrating face cream",
  "price": 29.99,
  "category": "skincare",
  "image_one": "https://cloudinary.com/...",
  "reviews": [
    {
      "_id": "review_id_1",
      "review": "Great product!"
    }
  ]
}
```

---

#### Get Product Reviews
```http
GET /review/:productId
```

**URL Parameters:**
- `productId` - Product ID

**Success Response:** `200 OK`
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "review": "Amazing product, highly recommend!",
    "product_id": "product_id_123",
    "user_id": {
      "_id": "user_id_456",
      "name": "John Doe"
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## Protected Endpoints (Authentication Required)

### Shopping Cart

#### Get User Cart
```http
GET /cart
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`
```json
{
  "_id": "cart_id_123",
  "user_id": "user_id_456",
  "status": "aberto",
  "products": [
    {
      "_id": "cartproduct_id_789",
      "product_id": {
        "_id": "product_id_123",
        "name": "Moisturizing Cream",
        "price": 29.99,
        "image_one": "https://cloudinary.com/..."
      },
      "qty": 2,
      "cart_id": "cart_id_123"
    }
  ]
}
```

---

#### Add Product to Cart
```http
POST /cart/:productId
```

**URL Parameters:**
- `productId` - Product ID to add

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "qty": 1
}
```

**Success Response:** `201 Created` or `200 OK`
```json
{
  "_id": "cart_id_123",
  "user_id": "user_id_456",
  "products": ["cartproduct_id_789"],
  "status": "aberto"
}
```

---

#### Update Cart Item Quantity
```http
PUT /cart/:productId
```

**URL Parameters:**
- `productId` - Product ID to update

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "qty": 3
}
```

**Success Response:** `200 OK`
```json
{
  "product": {
    "_id": "cartproduct_id_789",
    "product_id": "product_id_123",
    "qty": 3,
    "cart_id": "cart_id_123"
  }
}
```

---

#### Update Cart Status to Closed
```http
PUT /cart-fechado
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`
```json
{
  "cart": {
    "_id": "cart_id_123",
    "status": "fechado"
  }
}
```

---

#### Update Cart Status to Paid
```http
PUT /cart-pago
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`
```json
{
  "cart": {
    "_id": "cart_id_123",
    "status": "pago"
  }
}
```

---

#### Remove Product from Cart
```http
DELETE /cart/:productId
```

**URL Parameters:**
- `productId` - Product ID to remove

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`

---

#### Clear Cart (Remove All Products)
```http
DELETE /cart-all-products
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`

---

#### Delete Entire Cart
```http
DELETE /cart-delete
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`
```json
{
  "message": "Cart successfully deleted"
}
```

---

### Wishlist (My List)

#### Get User Wishlist
```http
GET /my-list
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`
```json
{
  "_id": "mylist_id_123",
  "user_id": "user_id_456",
  "products": [
    {
      "_id": "product_id_123",
      "name": "Moisturizing Cream",
      "price": 29.99,
      "image_one": "https://cloudinary.com/..."
    }
  ]
}
```

---

#### Add Product to Wishlist
```http
POST /my-list/:productId
```

**URL Parameters:**
- `productId` - Product ID to add

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK` or `201 Created`
```json
{
  "message": "product added to My List"
}
```

**Error Responses:**
- `400 Bad Request` - Product already in wishlist

---

#### Move Product from Wishlist to Cart
```http
POST /my-list-cart/:productId
```

**URL Parameters:**
- `productId` - Product ID to move

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `201 Created`
```json
{
  "_id": "cart_id_123",
  "user_id": "user_id_456",
  "products": ["cartproduct_id_789"]
}
```

---

#### Remove Product from Wishlist
```http
DELETE /my-list/:productId
```

**URL Parameters:**
- `productId` - Product ID to remove

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`

---

### Reviews

#### Create Product Review
```http
POST /review/:productId
```

**URL Parameters:**
- `productId` - Product ID to review

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "review": "This product is amazing! Highly recommend."
}
```

**Success Response:** `201 Created`
```json
{
  "_id": "review_id_123",
  "review": "This product is amazing! Highly recommend.",
  "product_id": "product_id_123",
  "user_id": "user_id_456",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

#### Update Review
```http
PUT /review/:reviewId
```

**URL Parameters:**
- `reviewId` - Review ID to update

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "review": "Updated review text"
}
```

**Success Response:** `200 OK`
```json
{
  "_id": "review_id_123",
  "review": "Updated review text",
  "product_id": "product_id_123",
  "user_id": "user_id_456"
}
```

---

#### Delete Review
```http
DELETE /review/:reviewId
```

**URL Parameters:**
- `reviewId` - Review ID to delete

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`
```json
{
  "message": "review deleted"
}
```

**Error Responses:**
- `400 Bad Request` - User can't delete other users' reviews

---

### User Profile

#### Get All Users
```http
GET /user
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`
```json
[
  {
    "_id": "user_id_456",
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

---

#### Get Logged User Profile
```http
GET /user-logged
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response:** `200 OK`
```json
{
  "_id": "user_id_456",
  "name": "John Doe",
  "email": "john@example.com",
  "my_list": "mylist_id_123"
}
```

---

## Admin Endpoints (Authentication Required)

### Admin Authentication

#### Register Admin
```http
POST /admin-auth/signup
```

**Request Body:**
```json
{
  "name": "admin",
  "password": "secureAdminPassword123"
}
```

**Success Response:** `201 Created`
```json
{
  "name": "admin"
}
```

**Error Responses:**
- `500 Internal Server Error` - Missing fields or username already exists

---

#### Login Admin
```http
POST /admin-auth/login
```

**Request Body:**
```json
{
  "name": "admin",
  "password": "secureAdminPassword123"
}
```

**Success Response:** `200 OK`
```json
{
  "msg": {
    "id": "admin_id_123",
    "name": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400 Bad Request` - Invalid credentials

---

### Product Management (Admin Only)

#### Create Product
```http
POST /product
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Moisturizing Cream",
  "description": "Hydrating face cream for all skin types",
  "price": 29.99,
  "category": "skincare",
  "brand": "Beauty Brand",
  "image_one": "https://cloudinary.com/..."
}
```

**Success Response:** `201 Created`
```json
{
  "_id": "product_id_123",
  "name": "Moisturizing Cream",
  "description": "Hydrating face cream for all skin types",
  "price": 29.99,
  "category": "skincare",
  "brand": "Beauty Brand",
  "image_one": "https://cloudinary.com/...",
  "reviews": []
}
```

**Error Responses:**
- `500 Internal Server Error` - Unauthorized or error creating product

---

#### Create Multiple Products
```http
POST /product/many
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
[
  {
    "name": "Product 1",
    "description": "Description 1",
    "price": 19.99,
    "category": "skincare"
  },
  {
    "name": "Product 2",
    "description": "Description 2",
    "price": 24.99,
    "category": "makeup"
  }
]
```

**Success Response:** `201 Created`
```json
[
  {
    "_id": "product_id_1",
    "name": "Product 1",
    "price": 19.99
  },
  {
    "_id": "product_id_2",
    "name": "Product 2",
    "price": 24.99
  }
]
```

---

#### Upload Product Image
```http
PUT /product/upload-image/:productId
```

**URL Parameters:**
- `productId` - Product ID

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Request Body:**
```
image: <file>
```

**Success Response:** `200 OK`
```json
{
  "_id": "product_id_123",
  "name": "Moisturizing Cream",
  "image_one": "https://res.cloudinary.com/...",
  "price": 29.99
}
```

---

#### Update Product
```http
PUT /product/:productId
```

**URL Parameters:**
- `productId` - Product ID

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "payload": {
    "name": "Updated Product Name",
    "price": 34.99,
    "description": "Updated description"
  }
}
```

**Success Response:** `200 OK`
```json
{
  "_id": "product_id_123",
  "name": "Updated Product Name",
  "price": 34.99,
  "description": "Updated description"
}
```

---

#### Delete Product
```http
DELETE /product/:productId
```

**URL Parameters:**
- `productId` - Product ID

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Success Response:** `200 OK`

**Error Responses:**
- `500 Internal Server Error` - Unauthorized or error deleting product

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Invalid authentication |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error |

## 🔗 Related Repositories

- **Frontend**: [beauty-store-main](https://github.com/deboraseo/beauty-store-main)

## 📄 License & Copyright

⚠️ **Important Notice:**
- This code is available for **viewing and educational purposes only**
- **Copying, modifying, or using this code** for commercial or personal projects **without explicit permission is prohibited**
- For usage permissions or inquiries, please contact the repository owner

## 👥 Contact

For questions, feedback, or permission requests, please open an issue in the GitHub repository.

---

Built with ❤️ using Node.js & Express
