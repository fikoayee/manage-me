import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};
