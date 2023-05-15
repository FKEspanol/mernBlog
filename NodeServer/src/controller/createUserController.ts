import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/models';
import schema from './helpers/registerFormValidator';


const createUser = async(req: Request, res: Response) => {
    const {name, email, password} = req.body;
    try {

        const validate = schema.validate({ password});
        if(validate.error) {
            return res.status(400).json({ error: validate.error.details[0]})
        }
        const userEmailTaken = await User.findOne({ email });
        if(userEmailTaken) 
            return res.status(409).json({ error: 'A user with the same email already exist, please try another one'});

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = await new User({ name, email, password: hashedPassword }).save();
        
        res.status(201).json({ newUser })
    } catch (error) {
        console.log(error)
    }
}

export default createUser;

