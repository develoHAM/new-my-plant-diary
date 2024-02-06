import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import * as authController from '../controller/authController.js';
const router = express.Router();

router.post('/', authController.post_auth);
router.delete('/', authController.delete_auth);

export default router;
