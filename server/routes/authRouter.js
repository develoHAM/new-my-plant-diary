import express from 'express';
import * as authController from '../controller/authController.js';
const router = express.Router();

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: "사용자 인증 및 토큰 발급"
 *     description: "사용자를 인증하고 JWT 토큰을 발급합니다."
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       "200":
 *         description: "로그인 성공"
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
 *                   $ref: '#/components/schemas/user'
 *       "401":
 *         description: "인증 실패"
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
 *
 *   delete:
 *     summary: "로그아웃"
 *     description: "사용자를 로그아웃하고 세션을 종료합니다."
 *     tags: [auth]
 *     responses:
 *       "200":
 *         description: "로그아웃 성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       "500":
 *         description: "서버 에러"
 */

router.post('/', authController.post_auth);
router.delete('/', authController.delete_auth);

export default router;
