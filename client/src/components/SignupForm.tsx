import { useForm, SubmitHandler } from 'react-hook-form';
import { postUser, validateEmail } from '../utils/axios';
import { registerUserFormFields } from '../data/constants/types/form';
import { useState } from 'react';
import {
	__FormContainer,
	__Title,
	__Form,
	__Label,
	__Input,
	__InputContainer,
	__InputWrapper,
	__ValidationContainer,
	__Validation,
	__RegisterButton,
} from '../styles/__components/__SignupForm';

export default function SignupForm() {
	const {
		register,
		handleSubmit,
		trigger,
		getValues,
		clearErrors,
		formState: { errors, isValid, dirtyFields },
		reset,
		setFocus,
	} = useForm<registerUserFormFields>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			name: '',
			pw: '',
			pwConfirm: '',
		},
	});

	const registerUser: SubmitHandler<registerUserFormFields> = async (values) => {
		const formData = {
			name: values.name,
			email: values.email,
			password: values.pw,
		};
		const { result, message, data } = await postUser(formData);
		if (result) {
			alert('회원가입 성공');
			reset();
		} else {
			alert('회원가입 실패');
			reset();
		}
	};

	const [inputFocus, setInputFocus] = useState({ email: false, name: false, pw: false, pwConfirm: false });

	return (
		<__FormContainer>
			<__Title>회원가입</__Title>
			<__Form onSubmit={handleSubmit(registerUser)}>
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
								validate: {
									checkDuplication: async (value) => {
										const { result, message } = await validateEmail(value);
										if (!result) {
											return message;
										} else {
											return undefined;
										}
									},
								},
							})}
							onFocus={() => setInputFocus({ ...inputFocus, email: true })}
							onBlur={() => setInputFocus({ ...inputFocus, email: false })}
						/>
					</__InputWrapper>
					<__ValidationContainer>
						<__Validation $error={errors.email ? true : false}>
							{errors.email?.message && `${errors.email.message}`}
							{dirtyFields.email && !errors.email?.message && '사용가능한 이메일 입니다.'}
						</__Validation>
					</__ValidationContainer>
				</__InputContainer>
				<__InputContainer>
					<__Label>성함</__Label>
					<__InputWrapper $highlight={inputFocus.name}>
						<__Input
							type={'text'}
							{...register('name', {
								required: '성함을 공백없이 입력해주세요',
								validate: {
									spaceCheck: (value) =>
										value.includes(' ') ? '성함을 공백없이 입력해주세요' : undefined,
								},
							})}
							onFocus={() => setInputFocus({ ...inputFocus, name: true })}
							onBlur={() => setInputFocus({ ...inputFocus, name: false })}
						/>
					</__InputWrapper>
					<__ValidationContainer>
						<__Validation $error={errors.name ? true : false}> {errors.name?.message}</__Validation>
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
								validate: {
									checkPwMatch: (value) => {
										if (value === getValues('pwConfirm')) {
											clearErrors('pwConfirm');
											return undefined;
										} else {
											trigger('pwConfirm');
										}
									},
								},
							})}
							onFocus={() => setInputFocus({ ...inputFocus, pw: true })}
							onBlur={() => setInputFocus({ ...inputFocus, pw: false })}
						/>
					</__InputWrapper>
					<__ValidationContainer>
						<__Validation $error={errors.pw ? true : false}> {errors.pw?.message}</__Validation>
					</__ValidationContainer>
				</__InputContainer>
				<__InputContainer>
					<__Label>비밀번호 확인</__Label>
					<__InputWrapper $highlight={inputFocus.pwConfirm}>
						<__Input
							type={'password'}
							{...register('pwConfirm', {
								required: '비밀번호를 확인해주세요',
								validate: {
									checkPwMatch: (value) =>
										value === getValues('pw') ? undefined : '비밀번호가 일치하지 않습니다.',
								},
							})}
							onFocus={() => setInputFocus({ ...inputFocus, pwConfirm: true })}
							onBlur={() => setInputFocus({ ...inputFocus, pwConfirm: false })}
						/>
					</__InputWrapper>
					<__ValidationContainer>
						<__Validation $error={errors.pwConfirm ? true : false}>
							{errors.pwConfirm?.message}
						</__Validation>
					</__ValidationContainer>
				</__InputContainer>
				<__RegisterButton type={'submit'} disabled={!isValid}>
					가입하기
				</__RegisterButton>
			</__Form>
		</__FormContainer>
	);
}
