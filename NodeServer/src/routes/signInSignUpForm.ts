import express from 'express';
import createUserController from "../controller/createUserController";
import loginUserController from "../controller/loginUserController";
import { validateCreateUserForm, validateLoginForm } from "../middleware/formValidation";

const router = express.Router();

router.post('/createUser',validateCreateUserForm, createUserController);
router.post('/loginUser', validateLoginForm, loginUserController)

export default router;