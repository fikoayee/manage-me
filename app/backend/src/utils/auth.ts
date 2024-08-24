import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, '8f6e27b1e3d6e1a9170fc3cba5d8c4e0b22e5f92f9b7f8246c5c2e4b5ed2f89ef');
};
