import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser.js';
import * as userController from '../controller/userController.js';
const router = express.Router();
import { uploadFile } from '../middlewares/uploadFile.js';
import { deleteFile } from '../middlewares/deleteFile.js';
import { deleteDirectory } from '../middlewares/deleteDirectory.js';

/**
 * @swagger
 * /api/user/email/{email}/availability:
 *   parameters:
 *     - in: path
 *       name: email
 *       required: true
 *       description: 존재 유무 확인할 이메일
 *       schema:
 *         type: string
 *   get:
 *     summary: "이메일 유일 여부 조회"
 *     description: "특정 이메일이 존재하는지 데이터베이스에서 확인 후 존재 유무 반환"
 *     tags: [user]
 *     responses:
 *       "200":
 *         description: 이메일 존재 유무 확인
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
 *         description: 서버 에러
 */
router.get('/email/:email/availability', userController.check_email);

/**
 * @swagger
 * paths:
 *  /api/user:
 *    get:
 *      summary: "사용자 정보 조회"
 *      description: "사용자 인증 후 사용자 정보 조회 및 정보 반환"
 *      tags: [user]
 *      security:
 *        - cookieAuth: []
 *      responses:
 *        "200":
 *          description: 사용자 생성 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  message:
 *                    type: string
 *                  data:
 *                    $ref: '#/components/schemas/user'
 *        "401":
 *          description: 사용자 인증 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  message:
 *                    type: string
 *                  data:
 *                    type: null
 *        "500":
 *          description: 서버 에러 발생
 *      securitySchemes:
 *        cookieAuth:
 *          type: apiKey
 *          in: cookie
 *          name: LOGIN
 *          description: JWT가 담긴 쿠키
 */
router.get('/', authenticateUser, userController.get_user);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: "사용자 정보 생성"
 *     description: "새로운 사용자를 생성하고 사용자 인증 토큰을 쿠키로 발급."
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - name
 *               - password
 *     responses:
 *       "201":
 *         description: 회원가입 및 토큰 발급 성공
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
 *       "409":
 *         description: 이미 존재하는 사용자
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
 *         description: 서버 에러 발생
 */
router.post('/', userController.post_new_user);

/**
 * @swagger
 * /api/user:
 *   patch:
 *     summary: "사용자 정보 수정"
 *     description: "사용자 인증 후 사용자 정보 수정 및 정보 반환"
 *     tags: [user]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile_pic:
 *                 type: string
 *                 format: binary
 *               userInfo:
 *                 type: string
 *                 description: "수정할 사용자 정보(JSON)을 문자열 처리한 값"
 *                 examples:
 *                   example1:
 *                     value: '{"name": "string"}'
 *                   example2:
 *                     value: '{"password":"string"}'
 *                   example3:
 *                     value: '{"profile_pic":""}'
 *     responses:
 *       "200":
 *         description: "사용자 정보 수정 성공"
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
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: LOGIN
 *       description: JWT가 담긴 쿠키
 */
router.patch('/', authenticateUser, uploadFile, deleteFile, userController.patch_user);

/**
 * @swagger
 * paths:
 *  /api/user:
 *    delete:
 *      summary: "사용자 정보 삭제"
 *      description: "사용자 정보 삭제 후 결과 반환"
 *      tags: [user]
 *      security:
 *        - cookieAuth: []
 *      responses:
 *        "200":
 *          description: "사용자 정보 삭제 성공"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  message:
 *                    type: string
 *        "401":
 *          description: "사용자 인증/인가 실패"
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: boolean
 *                  message:
 *                    type: string
 *                  data:
 *                    type: null
 *        "500":
 *          description: "서버 에러"
 *      securitySchemes:
 *        cookieAuth:
 *          type: apiKey
 *          in: cookie
 *          name: LOGIN
 *          description: JWT가 담긴 쿠키
 */
router.delete('/', authenticateUser, deleteDirectory, userController.delete_user);

export default router;
