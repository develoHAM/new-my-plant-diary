import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import * as userController from '../controller/userController.js';
const router = express.Router();
import { uploadFile } from '../middlewares/uploadFile.js';
import { deleteFile } from '../middlewares/deleteFile.js';
import { deleteDirectory } from '../middlewares/deleteDirectory.js';

router.get('/', authenticateUser, userController.get_user);
router.get('/email/:email', userController.check_email);
router.post('/', userController.post_new_user);
router.patch('/', authenticateUser, uploadFile, deleteFile, userController.patch_user);
router.delete('/', authenticateUser, deleteDirectory, userController.delete_user);

export default router;
