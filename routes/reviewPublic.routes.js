const { Router } = require('express');
const Review = require('../models/Review');

const router = Router();

//pegar todos os reviews de um produto
router.get('/review/:productId', async(req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ product_id: productId}).populate('user_id', 'name');

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error trying to get reviews', error });
    }
});

module.exports = router;