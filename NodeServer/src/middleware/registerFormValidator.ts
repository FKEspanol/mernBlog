import { Request, Response } from "express";
import Joi from "joi";
import { User } from "../models/models";

interface ValidationError {
    key: string, message: string
}

class CustomClientError extends Error {
    public validationError: ValidationError;
    public type: string;
    public statusCode: number;

    constructor(validationError: ValidationError, statusCode: number) {
        super(validationError.message);
            this.validationError = validationError;
            this.type = "CustomClientError"
            this.statusCode = statusCode
    }
}

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

const validateRequestBody = async(req: Request, res: Response, next: Function) => {
    try {
        const requestBody = req.body;
        const validate = schema.validate(requestBody);
    
        if(validate.error) {
            const errorDetails = validate.error.details[0];
            const validationError: ValidationError = {
                key: errorDetails.context?.key as string,
                message: errorDetails.message,
            }
            throw new CustomClientError(validationError, 400)
        } else {
            const userEmailIsTaken = await User.findOne({ email: requestBody.email});
            if(userEmailIsTaken) {
                const validationError: ValidationError = {
                    key: "email",
                    message: 'A user with the same email already exist, please try another one'
                }

                throw new CustomClientError(validationError, 409)
            }

            next();
        }
    } catch (error) {
        if(error instanceof CustomClientError) {
            console.error(error.message)
            res.status(error.statusCode).json({
                error: {
                    type: error.type,
                    ...error.validationError,

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

export default validateRequestBody;