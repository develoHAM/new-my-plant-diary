import { useForm, SubmitHandler } from 'react-hook-form';
import { userInfoState, axiosUploadingProgressState } from '../utils/state';
import { useRecoilState } from 'recoil';
import { changeNameFormField } from '../data/constants/types/form';
import { useEffect } from 'react';
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
} from '../styles/__components/__ProfileForm';

export default function NameForm({ formState, setFormState }: FormStateProps) {
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);
	const [uploadProgress, setUploadProgress] = useRecoilState(axiosUploadingProgressState);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setFocus,
	} = useForm<changeNameFormField>({
		mode: 'onChange',
		defaultValues: {
			name: userInfo.name,
		},
	});

	const cancelChangingName = () => {
		setFormState({ ...formState, changingName: false });
	};

	const submitNameChange: SubmitHandler<changeNameFormField> = async (value) => {
		const formData = new FormData();
		formData.append('userInfo', JSON.stringify({ name: value.name }));
		const { result, message, data } = await patchUser(formData);
		if (result) {
			setUserInfo(data);
			cancelChangingName();
		} else {
			alert(message);
		}
	};

	useEffect(() => {
		setFocus('name');
	}, []);

	return (
		<__FormContainer>
			<__Form onSubmit={handleSubmit(submitNameChange)}>
				<__InfoInput
					type={'text'}
					{...register('name', {
						required: '성함을 입력해주세요',
						validate: {
							spaceCheck: (value) => (value.includes(' ') ? '성함을 공백없이 입력해주세요' : undefined),
						},
					})}
				/>
				<__ErrorMessageContainer>
					<__ErrorMessage>{errors.name?.message}</__ErrorMessage>
				</__ErrorMessageContainer>
				<__ButtonContainer>
					<__CancelButton type={'button'} onClick={cancelChangingName}>
						취소
					</__CancelButton>
					<__ConfirmButton type={'submit'} onClick={handleSubmit(submitNameChange)} disabled={!isValid}>
						적용
					</__ConfirmButton>
				</__ButtonContainer>
			</__Form>
		</__FormContainer>
	);
}
