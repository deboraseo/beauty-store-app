const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = Router();


router.post('/admin-auth/signup', async (req, res) => {
    const { name, password } = req.body;
    try {
        if (!name || !password) {
            throw new Error('Missing username or password');
        }
        
        const admin = await Admin.findOne({ name });
        if (admin) {
            throw new Error('username already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create({
            name,
            passwordHash
        });
        res.status(201).json({
            name: newAdmin.name
        });
    } catch(error) {
        res.status(500).json({ msg: 'Error while creating admin', error})
    }
});


router.post('/admin-auth/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await Admin.findOne({ name });
  
        if (!user) {
            throw new Error('username not found');
        }

        const compareHash = bcrypt.compareSync(password, user.passwordHash);
        if (!compareHash) {
            throw new Error('username or password incorrect');
        }

        const payload = {
            id: user.id,
            name: user.name
        };

        //criando token
        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            { expiresIn: '1day' }
        );

        res.status(200).json({ msg: payload, token });

    } catch(error) {
        res.status(400).json({ message: 'Error trying to login', error: error.message });
    }
});


module.exports = router;