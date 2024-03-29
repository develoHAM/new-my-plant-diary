import { useEffect, useLayoutEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { loginState, userInfoState } from '../state';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../axios';

export const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
	const resetLoginState = useResetRecoilState(loginState);

	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const resetUserInfoState = useResetRecoilState(userInfoState);

	const navigate = useNavigate();

	useEffect(() => {
		const getUserInfo = async () => {
			const res = await getUser();
			console.log(res);
			if (res.result) {
				setIsLoggedIn(true);
				setUserInfo(res.data);
			} else {
				resetLoginState();
				resetUserInfoState();
				navigate('/');
			}
		};

		getUserInfo();
	}, []);

	return isLoggedIn;
};
