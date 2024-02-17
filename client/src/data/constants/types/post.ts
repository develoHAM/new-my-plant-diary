import { Dispatch, SetStateAction } from 'react';

export interface post {
	id: number;
	title: string;
	plant: string;
	content: string;
	date: string;
	img: string | null;
	createdAt: string;
	updatedAt: string;
	writer_email?: string;
}

export interface PostFormDefaultValues {}

export interface PostCardProps {
	post: post;
}

export interface PostCardEditProps {
	post: post;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export interface editPostFormFields {
	id?: number;
	title: string;
	plant: string;
	content: string;
	date: string;
	img: string | null;
	createdAt?: string;
	updatedAt?: string;
	writer_email?: string;
}

export interface PostEdit {
	id?: number;
	title: string;
	plant: string;
	content: string;
	date: string;
	img: string | null;
	createdAt?: string;
	updatedAt?: string;
	writer_email?: string;
}
