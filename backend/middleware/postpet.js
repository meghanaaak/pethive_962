// middleware/requireLogin.js
import jwt from "jsonwebtoken";

// Middleware to check if the user is logged in
export const requireLogin = (req, res, next) => {
  try {
    // Check if the user is authenticated by checking for the presence of a JWT token in cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If the token is present, verify it
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      // If the token is valid, proceed to the next middleware
      next();
    });
  } catch (error) {
    console.log("Error in requireLogin middleware", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
