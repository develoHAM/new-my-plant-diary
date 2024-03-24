import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'My Plant Diary API',
			description: 'API documentation for My Plant Diary',
		},
		servers: [
			{
				url: 'http://localhost:8000',
			},
		],
		tags: [
			{
				name: 'auth',
				description: '로그인 / 로그아웃',
			},
			{
				name: 'user',
				description: '사용자',
			},
			{
				name: 'posts',
				description: '게시글',
			},
		],
		components: {
			securitySchemes: {
				cookieAuth: {
					type: 'apiKey',
					in: 'cookie',
					name: 'LOGIN',
					description: 'JWT가 담긴 쿠키',
				},
			},
		},
	},
	apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

const userSchema = {
	type: 'object',
	properties: {
		id: { type: 'integer' },
		name: { type: 'string' },
		password: { type: 'string' },
		profile_pic: { type: 'string' },
		email: { type: 'string' },
		createdAt: { type: 'string', format: 'date-time' },
		updatedAt: { type: 'string', format: 'date-time' },
	},
};

const postSchema = {
	type: 'object',
	properties: {
		id: { type: 'integer' },
		title: { type: 'string' },
		plant: { type: 'string' },
		content: { type: 'string' },
		img: { type: 'string' },
		date: { type: 'string' },
		createdAt: { type: 'string', format: 'date-time' },
		updatedAt: { type: 'string', format: 'date-time' },
	},
};

specs.components = {
	schemas: {
		user: userSchema,
		post: postSchema,
	},
};
console.log(specs);
export { swaggerUi, specs };
