import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/models";

export default async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const accessToken = jwt.sign(
        {
          _id: user?._id,
          username: user?.name,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "20m" }
      );

      const refreshToken = jwt.sign(
        {
          username: user?._id,
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );

      await User.findByIdAndUpdate(
        { _id: user._id },
        { $set: { refreshToken } }
      ); // Saving refreshToken with current user
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json(accessToken);
    } else {
      throw new Error("Server Error");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        type: "error",
        message: error.message,
      });
      console.log(error);
    }
  }
};
