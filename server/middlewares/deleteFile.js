import Models from '../models/index.js';
import AWS from 'aws-sdk';
const env = process.env;

const S3 = new AWS.S3({
	accessKeyId: env.S3_ID,
	secretAccessKey: env.S3_KEY,
	region: env.S3_REGION,
});

export const deleteFile = async (req, res, next) => {
	try {
		console.log('req.body====????', req.body);
		const paths = req.baseUrl.substring(1).split('/');
		console.log(paths);
		const location = paths[1];
		console.log('location', location);

		if (location == 'post') {
			const postId = Number(req.params.id);
			const post = await Models.Posts.findByPk(postId);
			if (!post) {
				return res.sendStatus(404);
			}

			if (req.method == 'DELETE') {
				const imgSRC = post.img;
				if (!imgSRC) {
					return next();
				}
				const objectKey = new URL(imgSRC).pathname.substring(1);
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
			}

			if (req.method == 'PATCH') {
				const patchData = JSON.parse(req.body.postData);
				if (location == 'post') {
					//기존 파일 유지
					if (!req.file && patchData.img) {
						return next();
					}

					//파일 안올리고 기존 파일 삭제만 혹은 파일 올리고 기존 파일 삭제
					if ((!req.file && !patchData.img) || req.file) {
						const imgSRC = post.img;
						if (!imgSRC) {
							return next();
						}
						const objectKey = new URL(imgSRC).pathname.substring(1);
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
					}
				}
			}
		}
		if (location === 'user') {
			console.log('location is USER');
			// 사진도 새로 안올리고, 기존 사진 삭제도 안하고
			if (!req.file && !req.body.userInfo) {
				return next();
			}
			// 사진을 안올리고, 기존 사진 삭제만
			//!req.file, req.body.userInfo
			// 사진을 새로 올렸고, 기존 사진 삭제
			// req.file, !req.body.userInfo

			if (req.file || req.body.userInfo) {
				const imgSRC = req.user.profile_pic;
				if (imgSRC == env.DEFAULT_PROFILE_IMG_SRC) {
					return next();
				}
				const objectKey = new URL(imgSRC).pathname.substring(1);
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
			}
		}
		// if (req.user.profile_pic == env.DEFAULT_PROFILE_IMG_SRC) {
		// 	return next();
		// }
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};

// export const deleteFile1 = async (req, res, next) => {
// 	if (!req.file) {
// 		console.log('deleteFile req.body ==', req.body);
// 		const { img } = JSON.parse(req.body);
// 		if (img) {
// 			console.log('YES IMG');
// 			return next();
// 		}
// 		console.log('NO IMG');
// 		const postId = Number(req.params.id);
// 		const post = await Models.Posts.findByPk(postId);
// 		if (!post) {
// 			return res.sendStatus(404);
// 		}

// 		return next();
// 	}
// 	if (req.user.profile_pic == env.DEFAULT_PROFILE_IMG_SRC) {
// 		return next();
// 	}
// 	try {
// 		const location = req.query.location || 'default';
// 		let imgSRC;
// 		if (req.params.id) {
// 			const postId = Number(req.params.id);
// 			const post = await Models.Posts.findByPk(postId);
// 			if (!post) {
// 				return res.sendStatus(404);
// 			}
// 			if (!post.img) {
// 				return next();
// 			}
// 			imgSRC = post.img;
// 		} else {
// 			imgSRC = req.user.profile_pic;
// 		}
// 		const objectKey = new URL(imgSRC).pathname.substring(1);

// 		console.log('objectKey', objectKey);
// 		const params = {
// 			Bucket: env.S3_BUCKET,
// 			Key: objectKey,
// 		};
// 		S3.deleteObject(params, (error, data) => {
// 			if (error) {
// 				console.log('error', error);
// 				return res.sendStatus(500);
// 			} else {
// 				console.log('data', data);
// 				return next();
// 			}
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		return res.sendStatus(500);
// 	}
// };
