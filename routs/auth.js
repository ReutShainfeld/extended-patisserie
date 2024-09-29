const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Register endpoint

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, phone });

        await newUser.save();

        // Send back the userId as part of the response
        res.status(201).json({
            message: 'User registered successfully',
            userId: newUser._id // Return the userId
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


// Login endpoint

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Make sure to send userId in the response
        res.status(200).json({
            message: 'Login successful',
            fullName: `${user.firstName} ${user.lastName}`,
            userId: user._id // This is what needs to be returned
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;