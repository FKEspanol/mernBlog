import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt"

import { User } from "../models/models";
import { ValidationErrors, ErrorResponse, CustomClientError } from "../helpers/validator";


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
        const errorDetails: ValidationErrors[] = []
    
        if(validate.error) {
            validate.error.details.map(i => {
                errorDetails.push({
                    key: i.context?.key as string,
                    message: i.message
                });
            })
            throw new CustomClientError(errorDetails, 400)
        } else {
            const userEmailIsTaken = await User.findOne({ email: requestBody.email});
            if(userEmailIsTaken) {
                errorDetails.push({
                    key: "email",
                    message: 'A user with the same email already exist, please try another one'
                })
                throw new CustomClientError(errorDetails, 409)
            }

            next();
        }
    } catch (error) {
        if(error instanceof CustomClientError) {
            console.error(error.message)
            res.status(error.errorResponse.statusCode).json(error.errorResponse)
        } else {
            console.error(error)
            res.status(500).json({
                statusCode: 500,
                message: "Server Error",
                details: {errorDetails: [{key: 'server', message: "Something went wrong in our server"}]}
            } as ErrorResponse)
        }
    }
}

const validateLoginForm = async(req: Request, res: Response, next: Function) => {
    try {
        const {email, password} = req.body;

        if (!email) {
            const errorDetails: ValidationErrors[] = [{ key: 'email', message: 'Please enter your email' }];
            throw new CustomClientError(errorDetails, 400);
          } else if (!password) {
            const errorDetails: ValidationErrors[] = [{ key: 'password', message: 'Please enter your password' }];
            throw new CustomClientError(errorDetails, 400);
          } else {
            const emailExist = await User.findOne({ email });
            if (!emailExist) {
              const errorDetails: ValidationErrors[] = [{ key: 'email', message: 'That email is not registered' }];
              throw new CustomClientError(errorDetails, 404);
            } else {
              const passwordMatched = await bcrypt.compare(password, emailExist.password as string);
              if (!passwordMatched) {
                const errorDetails: ValidationErrors[] = [{ key: 'password', message: 'Password does not match' }];
                throw new CustomClientError(errorDetails, 400);
              } else {
                next();
              }
            }
          }
          
    } catch (error) {
        if(error instanceof CustomClientError) {
            console.error(error.message)
            res.status(error.errorResponse.statusCode).json(error.errorResponse)
        } else {
            console.error(error)
            res.status(500).json({
                statusCode: 500,
                message: "Server Error",
                details: {errorDetails: [{key: 'server', message: "Something went wrong in our server"}]}
            } as ErrorResponse)
        }
    }
}

export {validateCreateUserForm, validateLoginForm};