import { Request, Response} from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/models";

export default  async(req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    res.status(200).json(user)
}

