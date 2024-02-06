import Models from '../models/index.js';
import AWS from 'aws-sdk';
const env = process.env;

const S3 = new AWS.S3({
	accessKeyId: env.S3_ID,
	secretAccessKey: env.S3_KEY,
	region: env.S3_REGION,
});

export const deleteFile = async (req, res, next) => {
	if (!req.file) {
		return next();
	}
	if (req.user.profile_pic == env.DEFAULT_PROFILE_IMG_SRC) {
		return next();
	}
	try {
		const location = req.query.location || 'default';
		let imgSRC;
		if (req.params.id) {
			const postId = Number(req.params.id);
			const post = await Models.Posts.findByPk(postId);
			if (!post) {
				return res.sendStatus(404);
			}
			if (!post.img) {
				return next();
			}
			imgSRC = post.img;
		} else {
			imgSRC = req.user.profile_pic;
		}
		const objectKey = new URL(imgSRC).pathname.substring(1);

		console.log('objectKey', objectKey);
		const params = {
			Bucket: env.S3_BUCKET,
			Key: objectKey,
		};
		S3.deleteObject(params, (error, data) => {
			if (error) {
				console.log('error', error);
				return res.sendStatus(500);
			} else {
				console.log('data', data);
				return next();
			}
		});
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};
