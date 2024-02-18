import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import authRouter from './routes/authRouter.js';
import db from './models/index.js';
import { authenticateUser } from './middlewares/authenticateUser.js';

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(SECRET));
app.use('/public', express.static('public'));

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', authenticateUser, postRouter);

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
