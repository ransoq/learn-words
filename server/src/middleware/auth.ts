import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      res.status(403).json({ message: "Token is undefined" });
    }

    if (token) {
      const isCustomAuth = token.length < 500;

      let decodedData;

      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);

        req.userId = decodedData?.sub as string;
      }

      next();
    }
  } catch (error) {
    res.status(403).json({ message: "Token is not valid" });
    console.log(error);
  }
};

export default auth;
