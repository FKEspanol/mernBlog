import { Request, Response } from "express";
import Joi from "joi";

import { User } from "../models/models";
import { ValidationErrors, CustomClientError } from "../helpers/validator";


const schema = Joi.object({
    name: Joi.string()
        .pattern(/^[A-Za-z]+$/)
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .required()

});

const validateCreateUserForm = async(req: Request, res: Response, next: Function) => {
    try {
        const requestBody = req.body;
        const validate = schema.validate(requestBody, { abortEarly: false });
        const listOfErrors: ValidationErrors[] = []
    
        if(validate.error) {
            validate.error.details.map(i => {
                listOfErrors.push({
                    key: i.context?.key as string,
                    message: i.message
                });
            })
            throw new CustomClientError(listOfErrors, 400)
        } else {
            const userEmailIsTaken = await User.findOne({ email: requestBody.email});
            if(userEmailIsTaken) {
                listOfErrors.push({
                    key: "email",
                    message: 'A user with the same email already exist, please try another one'
                })
                throw new CustomClientError(listOfErrors, 409)
            }

            next();
        }
    } catch (error) {
        if(error instanceof CustomClientError) {
            console.error(error.message)
            res.status(error.statusCode).json({
                error: {
                    type: error.type,
                    errorList: [...error.errorList]

                }
            })
        } else {
            console.error(error)
            res.status(500).json({
                error: {
                    type: "ServerError",
                    details: error
                }
            })
        }
    }
}

const validateLoginForm = async(req: Request, res: Response, next: Function) => {
    try {
        const {email, password} = req.body;

        
    } catch (error) {
        
    }
}

export {validateCreateUserForm};