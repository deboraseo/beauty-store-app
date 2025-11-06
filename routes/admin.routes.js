const { Router } = require('express');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const uploadImage = require('../config/cloudinary.config');

const router = Router();

//criar um produto
router.post('/product', async (req, res) => {
    const payload = req.body;
    const { id } = req.user;

    try {
        //verificar se e admin
        const adminId = await Admin.findById(id);
        if(!adminId) {
            throw new Error('user Unauthorized');
        }

        const newProduct = await Product.create(payload);
        res.status(201).json(newProduct);

    } catch(error) {
        res.status(500).json({ msg: 'Error while creating product', error: error.message || error });
    }
});


//criar varios produtos de uma vez(payload = array de produtos)
router.post('/poduct/many', async (req, res) => {
    const payload = req.body;
    const { id } = req.user;

    try {
        const adminId = await Admin.findById(id);
        if(!adminId) {
            throw new Error('user Unauthorized');
        }

        const newProducts =  await Product.create(payload);
       
        res.status(201).json(newProducts);
    } catch(error) {
        res.status(500).json({ msg: 'Error while creating products', error });
    }
});


//adicionar imagem do cloudinary
router.put('/product/upload-image/:productId', uploadImage.single('image'), async(req, res) => {
    const { path } = req.file

    const { productId } = req.params;
    const { id } = req.user;

    try {
        //verifica se e admin
        const adminId = await Admin.findById(id);
        if(!adminId) {
            throw new Error('user Unauthorized');
        }

        const updatePic = await Product.findByIdAndUpdate(productId, { image_one: path }, { new: true});
        res.status(200).json(updatePic);
    } catch(error) {
        res.status(500).json({ msg: 'Error while uploading image', error });
    }
});


//editar um produto
router.put('/product/:productId', async(req, res) => {
    const { productId } = req.params;
    const { payload } = req.body;
    const { id } = req.user;

    try {
        //verifica admin
        const adminId = await Admin.findById(id);
        if(!adminId) {
            throw new Error('user Unauthorized');
        }

        const editedProduct = await Product.findByIdAndUpdate(productId, payload);
        res.status(200).json(editedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error while editing product', error });
    }
});


//deletar um produto
router.delete('/product/:productId', async (req, res) => {
    const { productId } = req.params;
    const { id } = req.user;

    try {
        //verifica admin
        const adminId = await Admin.findById(id);
        if(!adminId) {
            throw new Error('user Unauthorized');
        }

        await Product.findByIdAndDelete(productId);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting product', error });
    }
})


module.exports = router;


