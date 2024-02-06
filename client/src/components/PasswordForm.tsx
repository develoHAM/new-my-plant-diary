import { useForm, SubmitHandler } from 'react-hook-form';
import { userInfoState } from '../utils/state';
import { useRecoilState } from 'recoil';
import { changePasswordFormField } from '../data/constants/types/form';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FormStateProps } from '../data/constants/types/form';
import { patchUser } from '../utils/axios';
import {
	__FormContainer,
	__Form,
	__InfoInput,
	__CancelButton,
	__ConfirmButton,
	__ErrorMessageContainer,
	__ErrorMessage,
	__ButtonContainer,
	__PwConfirmLabel,
} from '../styles/__components/__ProfileForm';

export default function PasswordForm({ formState, setFormState }: FormStateProps) {
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		clearErrors,
		getValues,
		trigger,
		setFocus,
	} = useForm<changePasswordFormField>({
		mode: 'onChange',
		defaultValues: {
			pw: '',
			pwConfirm: '',
		},
	});

	const cancelChangingPassword = () => {
		setFormState({ ...formState, changingPassword: false });
	};

	const submitPasswordChange: SubmitHandler<changePasswordFormField> = async (value) => {
		const formData = new FormData();
		formData.append('userInfo', JSON.stringify({ password: value.pw }));
		const { result, message, data } = await patchUser(formData);
		if (result) {
			setUserInfo(data);
			alert(message);
			cancelChangingPassword();
		} else {
			alert(message);
		}
	};

	useEffect(() => {
		setFocus('pw');
	}, []);

	return (
		<__FormContainer>
			<__Form onSubmit={handleSubmit(submitPasswordChange)}>
				<__InfoInput
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
				/>

				<__ErrorMessageContainer>
					<__ErrorMessage>{errors.pw?.message}</__ErrorMessage>
				</__ErrorMessageContainer>
				<__PwConfirmLabel>비밀번호 확인</__PwConfirmLabel>
				<__InfoInput
					type={'password'}
					{...register('pwConfirm', {
						required: '비밀번호를 확인해주세요',
						validate: {
							checkPwMatch: (value) =>
								value === getValues('pw') ? undefined : '비밀번호가 일치하지 않습니다.',
						},
					})}
				/>
				<__ErrorMessageContainer>
					<__ErrorMessage>{errors.pwConfirm?.message}</__ErrorMessage>
				</__ErrorMessageContainer>
				<__ButtonContainer>
					<__CancelButton type={'button'} onClick={cancelChangingPassword}>
						취소
					</__CancelButton>
					<__ConfirmButton type={'submit'} disabled={!isValid} onClick={handleSubmit(submitPasswordChange)}>
						적용
					</__ConfirmButton>
				</__ButtonContainer>
			</__Form>
		</__FormContainer>
	);
}
