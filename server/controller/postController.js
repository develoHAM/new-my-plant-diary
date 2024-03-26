import Models from '../models/index.js';

const env = process.env;
const SERVER_DOMAIN = env.SERVER_DOMAIN || 'http://localhost:8000';

export const get_posts = async (req, res) => {
	try {
		console.log('get_posts');
		const { posts } = await Models.Users.findByPk(req.user.id, {
			include: {
				model: Models.Posts,
				attributes: {
					exclude: ['writer_email'],
				},
			},
			order: [[Models.Posts, 'createdAt', 'DESC']],
		});
		return res.status(200).json({ result: true, message: '게시글들 불러오기 성공', data: posts });
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

export const get_post = async (req, res) => {
	try {
		console.log('get_post');
		console.log('req.param.id', req.params.id);
		const postId = Number(req.params.id);
		const post = await Models.Posts.findByPk(postId, {
			attributes: {
				exclude: ['writer_email'],
			},
		});
		if (post) {
			return res.status(200).json({ result: true, message: `${postId}번 게시글 불러오기 성공`, data: post });
		} else {
			return res.status(200).json({ result: true, message: '게시글이 존재하지 않습니다.', data: null });
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

export const post_post = async (req, res) => {
	try {
		console.log('post_post');
		let postData = {};
		if (req.file) {
			console.log('req.file', req.file);
			const filePath = env.NODE_ENV == 'development' ? `${SERVER_DOMAIN}/${req.file.path}` : req.file.location;
			postData.img = filePath;
		}
		if (req.body.postData) {
			const { date, title, content, plant } = JSON.parse(req.body.postData);
			postData.date = date;
			postData.title = title;
			postData.content = content;
			postData.plant = plant;
		}
		const savedPost = await Models.Posts.create({ ...postData, writer_email: req.user.email });
		if (savedPost) {
			return res.status(201).json({ result: true, message: '게시글 저장 성공', data: savedPost });
		} else {
			return res.sendStatus(500);
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

export const put_post = async (req, res) => {
	try {
		console.log('put_post');
		if (!req.params.id) {
			return res.sendStatus(400);
		}
		const postId = Number(req.params.id);
		const infoToUpdate = {};
		if (req.body.postData) {
			const postData = JSON.parse(req.body.postData);
			for (const key in postData) {
				infoToUpdate[key] = postData[key];
			}
		}
		if (req.file) {
			console.log('req.file', req.file);
			const newImgSRC = req.file.location;
			infoToUpdate.img = newImgSRC;
		}
		const [rowAffected] = await Models.Posts.update(infoToUpdate, {
			where: {
				id: postId,
			},
		});
		console.log('rowAffected', rowAffected);
		if (rowAffected) {
			const updatedPost = await Models.Posts.findOne({ where: { id: postId } });
			return res.status(200).json({ result: true, message: '게시글 수정 성공', data: updatedPost });
		} else {
			return res.status(400).json({ result: false, message: '존재하지 않는 id', data: null });
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

export const delete_post = async (req, res) => {
	try {
		console.log('delete_post');
		const postId = Number(req.params.id);
		const rowAffected = await Models.Posts.destroy({
			where: {
				id: postId,
			},
		});
		if (rowAffected) {
			return res.status(200).json({ result: true, message: '삭제 성공', data: null });
		} else {
			return res.status(400).json({ result: false, message: '존재하지 않는 id', data: null });
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};
