import express from 'express';
import createUserController from "../controller/createUserController";
import registerFormValidator from "../middleware/registerFormValidator";

const router = express.Router();

router.post('/createUser',registerFormValidator, createUserController);

export default router;