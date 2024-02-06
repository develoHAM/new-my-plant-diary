import express from 'express';
import { uploadFile } from '../middlewares/uploadFile.js';
import { deleteFile } from '../middlewares/deleteFile.js';
import * as postController from '../controller/postController.js';
const router = express.Router();

router.get('/', postController.get_posts);
router.get('/:id', postController.get_post);
router.post('/', uploadFile, postController.post_post);
router.patch('/:id', uploadFile, deleteFile, postController.patch_post);
router.delete('/:id', deleteFile, postController.delete_post);

export default router;
