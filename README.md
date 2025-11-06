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

## 📚 API Endpoints

### Public Routes
- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /product/all` - Get all products
- `GET /product/:id` - Get single product
- `GET /reviews/:productId` - Get product reviews

### Protected Routes (Require Authentication)
- `GET /cart` - Get user's cart
- `POST /cart/:productId` - Add product to cart
- `PUT /cart/:productId` - Update cart item quantity
- `DELETE /cart/:productId` - Remove product from cart
- `GET /my-list` - Get user's wishlist
- `POST /my-list/:productId` - Add product to wishlist
- `DELETE /my-list/:productId` - Remove from wishlist
- `POST /review/:productId` - Create product review
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

### Admin Routes
- Admin authentication and product management endpoints

## 🔗 Related Repositories

- **Frontend**: [beauty-store-main](https://github.com/deboraseo/beauty-store-main)

## 📄 License & Copyright

**Copyright © 2021-2025 Debora Seo. All Rights Reserved.**

This project is part of a personal portfolio and was created as a final project during the Ironhack Web Development Bootcamp in 2021.

⚠️ **Important Notice:**
- This code is available for **viewing and educational purposes only**
- **Copying, modifying, or using this code** for commercial or personal projects **without explicit permission is prohibited**
- This is proprietary software protected by copyright law
- For usage permissions or inquiries, please contact the repository owner

## 👥 Contact

For questions, feedback, or permission requests, please open an issue in the GitHub repository.

---

Built with ❤️ using Node.js & Express
