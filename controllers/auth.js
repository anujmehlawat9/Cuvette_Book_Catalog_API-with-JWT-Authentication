
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

// USER REGISTRATION

export const signup = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    // Validate input
    if (!name || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        error: "Conflict",
        message: "A user with this email already exists",
      });
    }

    // Default profile picture (no file upload)
    const profilePicture = `https://api.dicebear.com/5.x/initials/svg?seed=${
      name?.split(" ")[0]
    } ${name?.split(" ")[1] ?? ""}`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture,
      role: role || "user",
    });

    await newUser.save();

    // Remove password from response
    newUser.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// USER LOGIN

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Look for user
    const user = await User.findOne({ email }).populate("books");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Optional cookie version (works even without it)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production HTTPS
    });

    // Hide password before returning user
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
