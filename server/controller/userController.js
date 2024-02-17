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
			return res.status(200).json({ result: false, message: '이미 등록된 이메일 입니다.' });
		}
		return res.status(200).json({ result: true, message: '등록 가능한 이메일 입니다.' });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

export const get_user = async (req, res) => {
	try {
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
		}
		const encryptedPassword = await bcrypt.hash(password, ROUNDS);
		const newUser = await Models.Users.create({
			email: email,
			name: name,
			password: encryptedPassword,
		});
		const payload = { id: newUser.id, email: newUser.email, exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60 }; // 사용자 db ID, 이메일, 토큰 만료 시간(지금부터 2시간 이후)
		const JWT = jwt.sign(payload, SECRET);
		const cookieOptions = { signed: true, maxAge: 2 * 60 * 60 * 1000, httpOnly: true, overwrite: true }; // 2시간 뒤에 없어지는 쿠키
		res.cookie(COOKIE, JWT, cookieOptions);
		return res.status(201).json({ result: true, message: '회원가입 성공하여 토큰을 발급했습니다.', data: newUser });
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

			const filePath = env.NODE_ENV == 'development' ? `${SERVER_DOMAIN}/${req.file.path}` : req.file.location;

			const [rowAffected] = await Models.Users.update(
				{
					profile_pic: filePath,
				},
				{ where: { id } }
			);
			if (rowAffected) {
				const updatedUser = await Models.Users.findOne({ where: { id } });
				return res
					.status(200)
					.json({ result: true, message: '사용자 프로필 사진 수정 완료', data: updatedUser });
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
				}
				infoToUpdate[key] = userInfo[key];
			}
			if (infoToUpdate['profile_pic'] == null) {
				infoToUpdate['profile_pic'] = '/profile.jpg';
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
