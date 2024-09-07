import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check for missing fields
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be atleast 8 characters',
      });
    }

    // Check if the user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Generate a verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Expires in 24 hours
    });

    // Save the user to the database
    await user.save();

    // Generate JWT and set it as a cookie
    generateTokenAndSetCookie(res, user._id);

    // Send a success response (excluding the password)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { ...user._doc, password: undefined }, // Removing password from the response
    });
  } catch (error) {
    // Send a user-friendly error message
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  res.send('Login');
};

export const logout = async (req, res) => {
  res.send('Logout');
};
