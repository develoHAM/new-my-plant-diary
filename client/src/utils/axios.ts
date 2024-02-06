import axios from 'axios';
import { postUserData, loginData, imgInfo } from '../data/constants/types/axios';
const SERVERDOMAIN = process.env.REACT_APP_SERVER_DOMAIN || 'http://localhost:8000';

export const requestLogin = async (loginData: loginData) => {
	try {
		console.log('login');
		const response = await axios.post(`${SERVERDOMAIN}/auth`, loginData, {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const requestLogout = async () => {
	try {
		const response = await axios.delete(`${SERVERDOMAIN}/auth`, { withCredentials: true });
		console.log(response);
		return response.data;
	} catch (error: any) {
		console.log(error);
		if (error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const getUser = async () => {
	try {
		console.log('getUser');
		const response = await axios.get(`${SERVERDOMAIN}/user`, { withCredentials: true });
		return response.data;
	} catch (error: any) {
		if (error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const validateEmail = async (useremail: string) => {
	try {
		const response = await axios.get(`${SERVERDOMAIN}/user/email/${useremail}`);
		const { result, message } = response.data;
		console.log('response.data', response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return { result: false, message: '서버 오류' };
	}
};

export const postUser = async (userdata: postUserData) => {
	try {
		const response = await axios.post(`${SERVERDOMAIN}/user`, userdata, { withCredentials: true });
		const { result, message, data } = response.data;
		return response.data;
	} catch (error: any) {
		if (error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const patchUser = async (userdata: FormData) => {
	try {
		console.log('patchUser');
		const response = await axios.patch(`${SERVERDOMAIN}/user?location=profile`, userdata, {
			withCredentials: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		const { result, message, data } = response.data;
		return response.data;
	} catch (error: any) {
		if (error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const deleteUser = async () => {
	try {
		console.log('deleteUser');
		const response = await axios.delete(`${SERVERDOMAIN}/user`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error: any) {
		if (error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const postPost = async (postData: FormData, imgInfo: imgInfo) => {
	try {
		console.log('postPost');
		const response = await axios.post(
			`${SERVERDOMAIN}/post?location=posts&width=${imgInfo.width}&height=${imgInfo.height}`,
			postData,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
		return response.data;
	} catch (error: any) {
		if (error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const getPosts = async () => {
	try {
		console.log('getPosts');
		const response = await axios.get(`${SERVERDOMAIN}/post`, {
			withCredentials: true,
		});
		console.log(response);
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
		console.log('getPost');
		const response = await axios.get(`${SERVERDOMAIN}/post/${postId}`, {
			withCredentials: true,
		});
		console.log(response.data);
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.status >= 500) {
			return { result: false, message: '서버 오류', data: null };
		}
		return error.response.data;
	}
};

export const patchPost = async (postId: number, postData: FormData, imgInfo: imgInfo) => {
	try {
		console.log('patchPost');
		const response = await axios.patch(
			`${SERVERDOMAIN}/post/${postId}?location=posts&width=${imgInfo.width}&height=${imgInfo.height}`,
			postData,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);
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
		console.log('deletePost');
		const response = await axios.delete(`${SERVERDOMAIN}/post/${postId}`, {
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
