// require('dotenv').config();

// const mongoose = require('mongoose');
// const data = require('./data.json');
// const Product = require('../models/Product');

// const seed = async() => {
//     try {
//         const connect = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         await Product.deleteMany({});
//         await Product.insertMany(data);
//         await connect.disconnect();
//     } catch (error) {
//         console.error('Error seeding database:', error);
//         process.exit(1);
//     }
// };

// seed();

// IMPORTANT: Uncomment the code above to seed the database
// This will DELETE all existing products and insert new ones
// Use only when setting up the database for the first time


