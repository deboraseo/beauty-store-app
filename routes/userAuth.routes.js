const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart');

const router = Router();

router.post('/user-auth/signup', async (req, res) =>{
    const { name, email, password } = req.body;
    try {
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Missing field' });
        }

        const mail = await User.findOne({ email });
        if (mail) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const user = await User.findOne({ name });
        if (user) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            passwordHash
        });

        res.status(201).json({
            name: newUser.name
        });

    } catch (error) {
        res.status(500).json({ error: error.message || 'Error while creating user' })
    }
});


router.post('/user-auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing email or password' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Email not found, please enter a valid email' });
        }

        const compareHash = bcrypt.compareSync(password, user.passwordHash);
        if (!compareHash) {
            return res.status(401).json({ error: 'Email or password incorrect' });
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

    } catch (error) {
        res.status(500).json({ error: error.message || 'Error trying to login' });
    }
});

module.exports = router;

