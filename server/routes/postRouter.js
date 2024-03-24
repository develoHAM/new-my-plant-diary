import express from 'express';
import { uploadFile } from '../middlewares/uploadFile.js';
import { deleteFile } from '../middlewares/deleteFile.js';
import * as postController from '../controller/postController.js';
const router = express.Router();

/**
 * @swagger
 *
 * /api/posts:
 *   get:
 *     summary: "게시글 목록 조회"
 *     description: "사용자 인증 후 사용자의 모든 게시글들 조회"
 *     tags: [posts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       "200":
 *         description: "게시글 목록 조회 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/post'
 *       "401":
 *         description: "사용자 인증 실패"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       "500":
 *         description: "서버 에러"
 */

router.get('/', postController.get_posts);

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: "게시글 조회"
 *     description: "게시글 ID를 받아 해당 게시글 조회 및 정보 반환"
 *     tags: [posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: 게시글 ID
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: 사용자 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/post'
 *       "401":
 *         description: "사용자 인증 실패"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       "500":
 *         description: "서버 에러"
 */
router.get('/:id', postController.get_post);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: "게시글 생성"
 *     description: "제공된 데이터로 새로운 게시글을 생성하고 정보를 반환합니다."
 *     tags: [posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "게시글 사진"
 *               postData:
 *                 type: string
 *                 description: "게시글 정보(JSON)의 문자열"
 *                 example: '{"title": "게시글 제목", "content": "게시글 내용", "date": "YYYY-MM-DD", "plant": "식물 이름"}'
 *     responses:
 *       "201":
 *         description: "새로운 게시물이 성공적으로 작성되었습니다."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/게시물'
 *       "401":
 *         description: "사용자 인증 실패"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       "500":
 *         description: "서버 오류"
 */
router.post('/', uploadFile, postController.post_post);

/**
 * @swagger
 * /api/posts/{postId}:
 *   put:
 *     summary: "게시글 수정"
 *     description: "게시글 ID를 받아 해당 게시글을 수정하고 정보를 반환합니다."
 *     tags: [posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: 게시글 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: 게시글 사진
 *               postData:
 *                 type: string
 *                 description: 게시글 정보(JSON)의 문자열
 *                 example: '{"title": "수정된 게시글 제목", "content": "수정된 게시글 내용", "date": "YYYY-MM-DD", "plant": "수정된 식물 이름"}'
 *     responses:
 *       "200":
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/게시물'
 *       "401":
 *         description: "사용자 인증 실패"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       "500":
 *         description: "서버 에러"
 */
router.put('/:id', uploadFile, deleteFile, postController.put_post);

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: "게시글 삭제"
 *     description: "게시글 ID를 받아 해당 게시글을 삭제합니다."
 *     tags: [posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: 게시글 ID
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: 게시글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       "401":
 *         description: "사용자 인증 실패"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 *       "500":
 *         description: "서버 에러"
 */
router.delete('/:id', deleteFile, postController.delete_post);

export default router;
