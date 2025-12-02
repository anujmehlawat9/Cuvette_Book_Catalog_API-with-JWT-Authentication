import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';    
dotenv.config(); // Load environment variables from .env file

export  const auth=(req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
    // console.log('Token received:', token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
}

// export const isAdmin = (req, res, next) => {
//     if (req.user.role === 'admin') {
//         next(); 
//     } else {
//         res.status(403).json({ message: 'Access denied, admin only' });
//     }
// }

// export const isUser = (req, res, next) => {
//     if (req.user.role === 'user') {
//         next(); 
//     } else {
//         res.status(403).json({ message: 'Access denied, user only' });
//     }
// }