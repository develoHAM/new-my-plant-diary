import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import authRouter from './routes/authRouter.js';
import db from './models/index.js';
import { authenticateUser } from './middlewares/authenticateUser.js';

import { swaggerUi, specs } from './config/swagger.js';

dotenv.config();

const env = process.env;
const SECRET = env.SECRET;
const app = express();
const PORT = Number(env.PORT) || 8000;
const SERVER_DOMAIN = env.SERVER_DOMAIN || 'http://localhost:8000';
const CLIENT_DOMAIN = env.CLIENT_DOMAIN || 'http://localhost:3000';

console.log('CLIENT_DOMAIN', CLIENT_DOMAIN);
app.use(
	cors({
		origin: CLIENT_DOMAIN,
		credentials: true,
	})
);
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser(SECRET));
app.use('/public', express.static('public'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Define global Swagger components and tags
/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: 로그인 / 로그아웃
 *   - name: user
 *     description: 사용자 CRUD
 *   - name: posts
 *     description: 게시글 CRUD
 */
/**
 * @swagger
 * components:
 *   securitySchemas:
 *	   cookieAuth:
 *	     type: apiKey
 *       in: cookie
 * 		 name: LOGIN
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         profile_pic:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 *     post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         plant:
 *           type: string
 *         content:
 *           type: string
 *         img:
 *           type: string
 *         date:
 *           type: string
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 */

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/posts', authenticateUser, postRouter);

app.use('*', (req, res) => {
	console.log('req.baseUrl', req.baseUrl);
	res.json({ result: false, message: '올바른 접근이 아닙니다' });
});

db.sequelize.sync({ force: false }).then(() => {
	console.log('\n');
	console.log('|------------------DATABASE CONNECTED----------------|');
	app.listen(PORT, () => {
		console.log(`DOMAIN: ${SERVER_DOMAIN}`);
	});
});
