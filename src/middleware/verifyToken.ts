import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { config } from "dotenv";
import { RequestWithAuthData } from "../@types/express";
import { message } from "../constants/responseMessage";

config();

const verifyToken = (
  req: RequestWithAuthData,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: message.INVALID_TOKEN });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp <= currentTimestamp) {
      res.status(401).json({ message: message.TOKEN_EXPIRED });
      return;
    }

    (req as any).userId = decoded._id;

    next();
  } catch (err) {
    res.status(400).json({ message: message.TOKEN_EXPIRED });
  }
};

export default verifyToken;
