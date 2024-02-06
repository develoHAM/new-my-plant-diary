import Models from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const env = process.env;
const ROUNDS = Number(env.ROUNDS);
const SECRET = env.SECRET;
const COOKIE = env.COOKIE;
const SERVER_DOMAIN = env.SERVER_DOMAIN || 'http://localhost:8000';

export const check_email = async (req, res) => {
	try {
		const { email } = await req.params;
		console.log('email', email);
		const hasUser = await Models.Users.findOne({
			where: {
				email: email,
			},
		});
		if (hasUser) {
			return res.status(200).json({ result: false, message: '이미 존재하는 아이디 입니다.' });
		} else {
			return res.status(200).json({ result: true, message: '사용 가능한 아이디 입니다.' });
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

export const get_user = async (req, res) => {
	try {
		console.log(req.user.dataValues);
		return res.status(200).json({ result: true, message: '사용자 불러오기 성공', data: req.user });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

export const post_new_user = async (req, res) => {
	try {
		const { password, name, email } = req.body;
		const hasUser = await Models.Users.findOne({
			where: {
				email: email,
			},
		});
		if (hasUser) {
			return res.status(409).json({ result: false, message: '이미 계정이 존재합니다.', data: null });
		} else {
			const encryptedPassword = await bcrypt.hash(password, ROUNDS);
			const newUser = await Models.Users.create({
				email: email,
				name: name,
				password: encryptedPassword,
			});
			const payload = { id: newUser.id, email: newUser.email };
			const JWT = jwt.sign(payload, SECRET);
			const cookieOptions = { signed: true, maxAge: 3600000, httpOnly: true, overwrite: true };
			// res.cookie(COOKIE, JWT, cookieOptions);
			return res.status(201).json({ result: true, message: '회원 가입 성공 토큰 발급 완료', data: newUser });
		}
	} catch (error) {
		console.log('error', error);
		return res.sendStatus(500);
	}
};

export const patch_user = async (req, res) => {
	try {
		const { id } = req.user;
		if (req.file) {
			console.log(req.file);

			const filePath =
				env.NODE_ENV == 'development' ? `${SERVER_DOMAIN}/${req.file.path}` : req.file.transforms[0].location;

			const [rowAffected] = await Models.Users.update(
				{
					profile_pic: filePath,
				},
				{ where: { id } }
			);
			if (rowAffected) {
				const updatedUser = await Models.Users.findOne({ where: { id } });
				return res.status(200).json({ result: true, message: '사용자 정보 수정 완료', data: updatedUser });
			} else {
				console.log('실패');
				return res.sendStatus(500);
			}
		}
		if (req.body.userInfo) {
			const userInfo = JSON.parse(req.body.userInfo);
			const infoToUpdate = {};
			for (const key in userInfo) {
				if (key === 'password') {
					const encryptedPassword = await bcrypt.hash(userInfo[key], ROUNDS);
					infoToUpdate[key] = encryptedPassword;
				} else {
					infoToUpdate[key] = userInfo[key];
				}
			}
			const [rowAffected] = await Models.Users.update(infoToUpdate, {
				where: {
					id,
				},
			});
			if (rowAffected) {
				const updatedUser = await Models.Users.findOne({ where: { id } });
				return res.status(200).json({ result: true, message: '사용자 정보 수정 완료', data: updatedUser });
			} else {
				return res.sendStatus(500);
			}
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

export const delete_user = async (req, res) => {
	try {
		const userID = req.user.id;
		const rowAffected = await Models.Users.destroy({ where: { id: userID } });
		if (rowAffected) {
			const cookieOptions = { signed: true, maxAge: 0, httpOnly: true, overwrite: true };
			res.cookie(COOKIE, null, cookieOptions);
			return res.status(200).json({ result: true, message: '회원 탈퇴 성공', data: null });
		} else {
			return res.sendStatus(500);
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};
