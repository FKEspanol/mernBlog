import express from 'express';
import createUserController from "../controller/createUserController";
import { validateCreateUserForm } from "../middleware/formValidation";

const router = express.Router();

router.post('/createUser',validateCreateUserForm, createUserController);

export default router;