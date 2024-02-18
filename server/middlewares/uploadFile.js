import multer from 'multer';
import multerS3 from 'multer-s3-transform';
import AWS from 'aws-sdk';

const env = process.env;

const localStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/');
	},
	filename: function (req, file, cb) {
		console.log('file', file);
		cb(null, `${Date.now()}_${file.originalname}`);
	},
});

AWS.config.update({
	accessKeyId: env.S3_ID,
	secretAccessKey: env.S3_KEY,
	region: env.S3_REGION,
});

const S3Storage = multerS3({
	s3: new AWS.S3(),
	bucket: env.S3_BUCKET,
	acl: 'public-read',
	contentType: multerS3.AUTO_CONTENT_TYPE,
	shouldTransform: false,
	key: function (req, file, cb) {
		const paths = req.baseUrl.substring(1).split('/');
		const location = paths.shift();
		console.log('location', location);
		const extension = file.originalname.split('.').pop();
		const filePath = `uploads/${req.user.id}/${location}/${Date.now()}.${extension}`;
		cb(null, filePath);
	},
	// transforms: [
	// 	{
	// 		id: 'resized',
	// 		key: function (req, file, cb) {
	// 			const location = req.query.location || 'default'; // profile | posts
	// 			const extension = file.originalname.split('.').pop();
	// 			const filePath = `uploads/${req.user.id}/${location}/${Date.now()}.${extension}`;
	// 			cb(null, filePath);
	// 		},
	// 		transform: function (req, file, cb) {
	// 			const width = Number(req.query.width) || 100;
	// 			const height = Number(req.query.height) || 100;
	// 			cb(null, sharp().resize(width, height, { fit: 'inside' }));
	// 			cb(null);
	// 		},
	// 	},
	// ],
});

const upload = multer({ storage: env.NODE_ENV == 'development' ? localStorage : S3Storage });

export const uploadFile = upload.single('file');
