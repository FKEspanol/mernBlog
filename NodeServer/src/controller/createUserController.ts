import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/models';


export default async(req: Request, res: Response) => {    
    try {
        const {name, email, password} = req.body;
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = await new User({ name, email, password: hashedPassword }).save();
        res.status(201).json({ newUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: {
                type: "ServerError",
                details: error
            }
        })
    }
}



