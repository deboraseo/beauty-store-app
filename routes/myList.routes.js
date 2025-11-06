const { Router } = require('express');
const Cart = require('../models/Cart');
const CartProduct = require('../models/CartProduct');
const MyList = require('../models/MyList');
const User = require('../models/User');

const router = Router();

router.get('/my-list', async(req, res) => {
    const { id } = req.user;
    try {
        const findedList = await MyList.findOne({ user_id: id }).populate('products');
        res.status(200).json(findedList);
    } catch(error) {
        res.status(500).json(error);
    }
})

//adicionar na minha lista
router.post('/my-list/:productId', async(req, res) => {
    const { productId } = req.params;
    const { id } = req.user;
    
    try {
        const list = await MyList.findOne({ user_id: id });
        const findId = list.products.includes(productId);
       
        if(findId){
            res.status(400).json({ message: 'product already added in your Favorites List'});
            return;
        }
        if(!list) {
            const newList = await MyList.create({ user_id: id });

            const updatedList = await MyList.findByIdAndUpdate(newList._id, { $push: { products: productId } }, { new: true });
            
            await User.findByIdAndUpdate(id, { my_list: newList._id });
            res.status(201).json(updatedList);
        } else {
            await MyList.findOneAndUpdate(list._id, { $push: { products: productId } }, { new: true });
            res.status(200).json({message: 'product added to My List'})
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

//adicionar no carrinho e deletar da Minha lista
router.post('/my-list-cart/:productId', async(req, res) => {
    const { productId } = req.params;
    const { id } = req.user;

    try {
        const cart = await Cart.findOne({ user_id: id });
        if(!cart) {
            const newcart = await Cart.create({ user_id: id});

            const payload = {
                product_id: productId,
                cart_id: newcart._id,
                qty: 1
            }
            const productCart = await CartProduct.create(payload);
            const updatedCart = await Cart.findByIdAndUpdate(newcart._id, { $push: { products: productCart._id } }, { new: true });
            res.status(201).json(updatedCart);
        
        } else {
            const payload = {
                product_id: productId,
                cart_id: cart._id,
                qty: 1
            }

            const prodCart = await CartProduct.create(payload);
            const updCart = await Cart.findByIdAndUpdate(cart._id, { $push: { products: prodCart._id }}, { new: true });

            await MyList.findOneAndUpdate({user_id: id}, { $pull: { products: productId } }, { new: true })
            res.status(201).json(updCart);
        }
    } catch(error) {
        res.status(500).json({ message: 'Error while moving product to cart', error })
    }
});

router.delete('/my-list/:productId', async(req, res)=> {
    const { productId } = req.params;
    const { id } = req.user;

    try {
        await MyList.findOneAndUpdate({user_id: id}, { $pull: { products: productId } }, { new: true })
        res.status(200).json();
    } catch(error) {
        res.status(500).json(error);
    };
});


module.exports = router;