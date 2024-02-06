import Models from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const env = process.env;
const COOKIE = env.COOKIE;
const SECRET = env.SECRET;

export const post_auth = async (req, res) => {
	try {
		console.log(req.body);
		const { email, password } = req.body;
		const existingUser = await Models.Users.findOne({
			where: {
				email: email,
			},
		});
		if (!existingUser) {
			return res.status(401).json({ result: false, message: '존재하지 않는 이메일', data: null });
		}
		const passwordMatch = await bcrypt.compare(password, existingUser.password);
		if (!passwordMatch) {
			return res.status(401).json({ result: false, message: '비밀번호 틀림', data: null });
		}
		const payload = { id: existingUser.id, email: existingUser.email };
		const JWT = jwt.sign(payload, SECRET);
		const cookieOptions = { signed: true, maxAge: 3600000, httpOnly: true, overwrite: true };
		res.cookie(COOKIE, JWT, cookieOptions);
		return res.status(200).json({ result: true, message: '로그인 성공, 토큰 발급 완료', data: existingUser });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

export const delete_auth = async (req, res) => {
	try {
		const cookieOptions = { signed: true, maxAge: 0, httpOnly: true, overwrite: true };
		res.cookie(COOKIE, null, cookieOptions);
		return res.status(200).json({ result: true, message: '로그아웃 성공' });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};
