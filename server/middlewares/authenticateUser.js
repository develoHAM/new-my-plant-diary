import Models from '../models/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const env = process.env;
const COOKIE = env.COOKIE;
const SECRET = env.SECRET;

export const authenticateUser = async (req, res, next) => {
	const originalToken = req.signedCookies[COOKIE];
	if (!originalToken) {
		return res.status(401).json({ result: false, message: '토큰이 없습니다. 다시 로그인 해주세요.', data: null });
	}
	try {
		const { id, email, exp } = jwt.verify(originalToken, SECRET);

		const currentTimestamp = Math.floor(Date.now() / 1000);
		if (exp < currentTimestamp) {
			return res
				.status(401)
				.json({ result: false, message: '만료된 토큰입니다. 다시 로그인 해주세요.', data: null });
		}
		const user = await Models.Users.findOne({
			where: {
				id: id,
				email: email,
			},
		});
		if (!user) {
			const cookieOptions = { signed: true, maxAge: 0, httpOnly: true, overwrite: true };
			res.cookie(COOKIE, null, cookieOptions);
			return res.status(401).json({ result: false, message: '올바르지 않은 토큰입니다', data: null });
		}
		// console.log('authenticated user', user);
		req.user = user;
		return next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};
