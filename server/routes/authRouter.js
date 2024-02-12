import express from 'express';
import * as authController from '../controller/authController.js';
const router = express.Router();

router.post('/', authController.post_auth);
router.delete('/', authController.delete_auth);

export default router;
