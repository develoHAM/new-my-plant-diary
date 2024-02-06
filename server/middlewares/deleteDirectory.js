import AWS from 'aws-sdk';
const env = process.env;

const S3 = new AWS.S3({
	accessKeyId: env.S3_ID,
	secretAccessKey: env.S3_KEY,
	region: env.S3_REGION,
});

export const deleteDirectory = async (req, res, next) => {
	try {
		const data = await S3.listObjectsV2({
			Bucket: env.S3_BUCKET,
			Prefix: `uploads/${req.user.id}/`,
		}).promise();

		console.log('data', data);
		const objects = data.Contents.map(({ Key }) => ({
			Key,
		}));
		console.log('objects', objects);

		if (objects.length > 0) {
			await S3.deleteObjects({
				Bucket: env.S3_BUCKET,
				Delete: { Objects: objects },
			}).promise();
		}

		await S3.deleteObject({
			Bucket: env.S3_BUCKET,
			Key: `uploads/${req.user.id}/`,
		}).promise();

		return next();
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
};
