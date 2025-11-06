const { Router } = require('express');
const Cart = require('../models/Cart');
const CartProduct = require('../models/CartProduct');

const router = Router();

//get all
router.get('/cart', async (req, res) => {
    const { id } = req.user;

    try {
        const cart = await Cart.findOne({ user_id: id }).populate({ path:'products', populate: { path: 'product_id' }});

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});


//Criar Cart, criar um CartProduct e adicionar no Cart
router.post('/cart/:productId', async (req, res) => {
    const { productId } = req.params;
    const { id } = req.user;
    const { qty } = req.body;

    try {
        const cart = await Cart.findOne({ user_id: id });
        
        //----se nao achar Cart!!-----
        if(!cart) {
            const newcart = await Cart.create({ user_id: id });

            const payload = {
                product_id: productId,
                cart_id: newcart._id,
                qty
            }
            const productCart = await CartProduct.create(payload);
            
            const updatedCart = await Cart.findByIdAndUpdate(newcart._id, { $push: { products: productCart._id } }, { new: true });
            res.status(201).json(updatedCart);

        } else {
            //------se encontar Cart-------
            const product = await CartProduct.findOne({ product_id: productId });

            if(product) {
                const newQty = product.qty + 1;
                const updatedProd = await CartProduct.findByIdAndUpdate(product._id, { qty: newQty });
                res.status(200).json({ message: 'Quantity upadted with success'});
            } else {
                const payload = {
                    product_id: productId,
                    cart_id: cart._id,
                    qty
                }
    
                const prodCart = await CartProduct.create(payload);
    
                const updCart = await Cart.findByIdAndUpdate(cart._id, { $push: { products: prodCart._id } }, { new: true });
                res.status(201).json(updCart);
            }
        }   
    } catch (error) {
        res.status(500).json({ message: 'Error while adding product to cart', error });
    }
});


//Editar(quantidade)
router.put('/cart/:productId', async (req,res) => {
    const { id } = req.user;
    const { qty } = req.body;
    const { productId } = req.params;

    try {
        const cart = await Cart.find({ user_id: id });
        const product = await CartProduct.findOneAndUpdate({ product_id: productId}, { qty }, { new: true });
        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json(error);
    }
});


//Alterar Status do Cart Fechado
router.put('/cart-fechado', async (req, res) => {
    const { id } = req.user;
    try {
        const cart = await Cart.findOneAndUpdate({ user_id: id}, { status: 'fechado' }, { new: true });
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json(error);
    }
});


//Cart Status Pago
router.put('/cart-pago', async (req, res) => {
    const { id } = req.user;
    try {
        const cart = await Cart.findOneAndUpdate({ user_id: id}, { status: 'pago' }, { new: true });
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json(error);
    }
});


//deletar um Cart Product dentro do Cart
router.delete('/cart/:productId', async (req, res) => {
    const { productId } = req.params;
    const { id } = req.user

    try {
        //procurar id do Cart 
        const cart = await Cart.findOne({ user_id: id });
        //procurar id do CartProduct que quero deletar
        const prodCart = await CartProduct.findOne({ cart_id: cart._id, product_id: productId });

        //remover em Cart(Array)
        await Cart.findByIdAndUpdate(cart._id, { $pull: { products:  prodCart._id }  }, { new: true } );

        //remover em CartProduct
        await CartProduct.findOneAndDelete({ cart_id: cart._id, product_id: productId });
        res.status(200).json();
    } catch(error) {
        res.status(500).json({ message: 'Error deleting product in Cart', error});
    }
});


//limpar Cart(remover todos os produtos)
router.delete('/cart-all-products', async (req, res) => {
    const { id } = req.user;
    
    try {
        const cart = await Cart.findOne({ user_id: id });
        //deletar todos os CartProduct
        await CartProduct.deleteMany({ cart_id: cart._id });

        //deletar dentro de Cart
        await Cart.findByIdAndUpdate(cart._id, { $set: { products: [] }});
        res.status(200).json();
    } catch (error) {
        res.status(500).json(error);
    }
});


//remover  entire Cart
router.delete('/cart-delete', async(req, res) => {
    const { id } = req.user;

    try {
        await CartProduct.deleteMany({ user_id: id });

        await Cart.findOneAndDelete({ user_id: id });
        res.status(200).json({ message: 'Cart succesfully deleted' });    
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;
