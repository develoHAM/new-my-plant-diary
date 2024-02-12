import { loginState, userInfoState } from '../utils/state';
import { useRecoilState } from 'recoil';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginFormFields } from '../data/constants/types/form';
import { requestLogin } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
	__FormContainer,
	__Title,
	__Form,
	__Label,
	__InputContainer,
	__InputWrapper,
	__Input,
	__ValidationContainer,
	__Validation,
	__LoginButton,
} from '../styles/__components/__LoginForm';

export default function LoginForm() {
	const [login, setLogin] = useRecoilState(loginState);
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		trigger,
		getValues,
		clearErrors,
		formState: { errors, isValid },
		reset,
	} = useForm<loginFormFields>({
		mode: 'onChange',
		defaultValues: {
			email: 'admin@develoham.com',
			pw: 'admin1234!',
		},
	});

	const loginUser: SubmitHandler<loginFormFields> = async (values) => {
		const formData = {
			email: values.email,
			password: values.pw,
		};
		const { result, message, data } = await requestLogin(formData);
		if (result) {
			setLogin(true);
			setUserInfo(data);
			reset();
			navigate('/calendar');
		} else {
			alert(message);
		}
	};
	const [inputFocus, setInputFocus] = useState({ email: false, pw: false });

	return (
		<__FormContainer>
			<__Title>로그인</__Title>
			<__Form onSubmit={handleSubmit(loginUser)}>
				<__InputContainer>
					<__Label>이메일 주소</__Label>
					<__InputWrapper $highlight={inputFocus.email}>
						<__Input
							type={'text'}
							{...register('email', {
								required: '이메일 주소를 정확히 입력해주세요.',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: '이메일 주소를 정확히 입력해주세요.',
								},
							})}
							onFocus={() => setInputFocus({ ...inputFocus, email: true })}
							onBlur={() => setInputFocus({ ...inputFocus, email: false })}
						/>
					</__InputWrapper>
					<__ValidationContainer>
						<__Validation>{errors.email?.message && `${errors.email.message}`}</__Validation>
					</__ValidationContainer>
				</__InputContainer>
				<__InputContainer>
					<__Label>비밀번호</__Label>
					<__InputWrapper $highlight={inputFocus.pw}>
						<__Input
							type={'password'}
							{...register('pw', {
								required: '비밀번호를 입력해주세요',
								pattern: {
									value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,16}$/,
									message: '영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)',
								},
							})}
							onFocus={() => setInputFocus({ ...inputFocus, pw: true })}
							onBlur={() => setInputFocus({ ...inputFocus, pw: false })}
						/>
					</__InputWrapper>
					<__ValidationContainer>
						<__Validation>{errors.pw?.message && `${errors.pw.message}`}</__Validation>
					</__ValidationContainer>
				</__InputContainer>
				<__LoginButton type={'submit'} disabled={!isValid}>
					로그인
				</__LoginButton>
			</__Form>
		</__FormContainer>
	);
}
