export interface post {
	id: number;
	title: string;
	plant: string;
	content: string;
	date: string;
	img: string;
	createdAt: string;
	updatedAt: string;
	writer_email?: string;
}

export interface PostCardProps {
	post: post;
}

export interface editPostFormFields {
	title: string;
	plant: string;
	content: string;
	date: string;
	img: string;
}
