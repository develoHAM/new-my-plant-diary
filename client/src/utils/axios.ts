import axios from 'axios';
import { postUserData, loginData } from '../data/constants/types/axios';
const SERVERDOMAIN = process.env.REACT_APP_SERVER_DOMAIN || 'http://localhost:8000/api';

export const requestLogin = async (loginData: loginData) => {
	try {
		const response = await axios.post(`${SERVERDOMAIN}/auth`, loginData, {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}

		return error.response.data;
	}
};

export const requestLogout = async () => {
	try {
		const response = await axios.delete(`${SERVERDOMAIN}/auth`, { withCredentials: true });
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const getUser = async () => {
	try {
		console.log('SERVERDOMAIN', SERVERDOMAIN);
		const response = await axios.get(`${SERVERDOMAIN}/user`, { withCredentials: true });
		return response.data;
	} catch (error: any) {
		console.log('error', error);
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const validateEmail = async (useremail: string) => {
	try {
		console.log('SERVERDOMAIN', SERVERDOMAIN);
		const response = await axios.get(`${SERVERDOMAIN}/user/email/${useremail}/availability`);
		const { result, message } = response.data;
		return response.data;
	} catch (error) {
		return { result: false, message: '서버 오류' };
	}
};

export const postUser = async (userdata: postUserData) => {
	try {
		const response = await axios.post(`${SERVERDOMAIN}/user`, userdata, { withCredentials: true });
		const { result, message, data } = response.data;
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const patchUser = async (userdata: FormData) => {
	try {
		const response = await axios.patch(`${SERVERDOMAIN}/user`, userdata, {
			withCredentials: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		const { result, message, data } = response.data;
		return response.data;
	} catch (error: any) {
		console.log(error);

		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const deleteUser = async () => {
	try {
		const response = await axios.delete(`${SERVERDOMAIN}/user`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const postPost = async (postData: FormData) => {
	try {
		const response = await axios.post(`${SERVERDOMAIN}/posts`, postData, {
			withCredentials: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const getPosts = async () => {
	try {
		const response = await axios.get(`${SERVERDOMAIN}/posts`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const getPost = async (postId: number) => {
	try {
		const response = await axios.get(`${SERVERDOMAIN}/posts/${postId}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const putPost = async (postId: number, postData: FormData) => {
	try {
		const response = await axios.put(`${SERVERDOMAIN}/posts/${postId}?location=posts`, postData, {
			withCredentials: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const deletePost = async (postId: number) => {
	try {
		const response = await axios.delete(`${SERVERDOMAIN}/posts/${postId}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};
