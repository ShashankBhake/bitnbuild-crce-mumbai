import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hash,
            role
        });

        await user.save();

        // Return only necessary information
        res.status(200).json({
            message: 'User registered successfully',
            userId: user._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error registering user',
            error: err.message
        });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const findUser = await User.findOne({ username });
        if (!findUser) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!bcrypt.compareSync(password, findUser.password)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payloadData = {
            userId: findUser._id,
            email: findUser.username
            // Add any other necessary data to the payload
        }

        const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
            expiresIn: "365d"
        });

        res.status(200).json({
            message: "Logged In",
            access_token: token,
            userId: findUser._id
            // Add any other necessary data to the response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error logging in',
            error: err.message
        });
    }
}
