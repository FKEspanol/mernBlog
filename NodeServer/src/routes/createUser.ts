import express from 'express';
import createUserController from "../controller/createUserController";

const router = express.Router();

router.post('/createUser', createUserController);

export default router;