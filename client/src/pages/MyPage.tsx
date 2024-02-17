import { useEffect, useRef } from 'react';
import { loginState, userInfoState } from '../utils/state';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { requestLogout, patchUser, deleteUser } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NameForm from '../components/NameForm';
import PasswordForm from '../components/PasswordForm';
import { useAuth } from '../utils/hooks/useAuth';
import ImageCropper from '../components/ImageCropper';
import {
	__PageContainer,
	__InfoStack,
	__TitleContainer,
	__Title,
	__Line,
	__ProfileImage,
	__ProfileImageContainer,
	__FileInput,
	__FileInputLabel,
	__InfoContainer,
	__InfoLabel,
	__InfoBox,
	__Info,
	__EditButton,
	__FormContainer,
	__LogoutButton,
	__DeleteAccountButton,
	__ImageCropperModal,
	__ImageCropperModalBody,
	__ImageControlsContainer,
	__DeleteImageButton,
} from '../styles/__pages/__MyPage';
import { CropperState } from '../data/constants/types/image';

export default function MyPage() {
	const isLoggedIn = useAuth();
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useRecoilState(userInfoState);

	const resetLoginState = useResetRecoilState(loginState);
	const resetUserInfoState = useResetRecoilState(userInfoState);

	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [croppedImage, setCroppedImage] = useState<File | null>(null);
	const [cropper, setCropper] = useState<CropperState | null>({
		zoom: 1,
		crop: { x: 0, y: 0 },
		aspect: 1,
		shape: 'round',
	});
	const [showCropperModal, setShowCropperModal] = useState(false);

	const [formState, setFormState] = useState({ changingName: false, changingPassword: false });

	const closeImageCropper = () => {
		setShowCropperModal(false);
	};

	useEffect(() => {
		handleFileUpload();
	}, [croppedImage]);

	const logoutUser = async () => {
		const { result, message } = await requestLogout();
		if (result) {
			alert(message);
			resetLoginState();
			resetUserInfoState();
			navigate('/');
		} else {
			alert(message);
		}
	};
	const inputFileRef = useRef<HTMLInputElement>(null);
	const resetFile = () => {
		if (inputFileRef.current) {
			inputFileRef.current.value = '';
		}
	};

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedImage(event.target.files[0]);
			setShowCropperModal(true);
		}
	};

	const handleFileUpload = async () => {
		if (!croppedImage) {
			return;
		}
		const formData = new FormData();
		formData.append('file', croppedImage);
		const { result, message, data } = await patchUser(formData);
		if (result) {
			alert(message);
			setUserInfo(data);
		}
	};

	const deleteImage = async () => {
		const formData = new FormData();
		formData.append('userInfo', JSON.stringify({ profile_pic: null }));
		const { result, message, data } = await patchUser(formData);
		if (result) {
			console.log(message);
			setUserInfo(data);
		} else {
			alert(message);
		}
	};

	const changeName = () => {
		setFormState({ ...formState, changingName: true });
	};

	const changePassword = () => {
		setFormState({ ...formState, changingPassword: true });
	};

	const handleDeleteUser = async () => {
		if (!window.confirm('회원 탈퇴 하시겠습니까?')) {
			return;
		}
		const { result, message, data } = await deleteUser();
		if (result) {
			alert(message);
			resetLoginState();
			resetUserInfoState();
			navigate('/');
		}
	};

	if (!isLoggedIn) {
		return null;
	}

	return (
		<>
			<__PageContainer fluid={'md'}>
				<__InfoStack>
					<__TitleContainer>
						<__Title>내 정보</__Title>
						<__Line />
					</__TitleContainer>
					<__ProfileImageContainer direction='horizontal'>
						<__ProfileImage src={userInfo.profile_pic} roundedCircle />
						<__ImageControlsContainer>
							<__FileInputLabel>
								변경하기
								<__FileInput
									type={'file'}
									accept={'image/*'}
									onChange={onFileChange}
									onClick={resetFile}
									ref={inputFileRef}
								/>
							</__FileInputLabel>
							<__DeleteImageButton
								onClick={deleteImage}
								disabled={userInfo.profile_pic === '/profile.jpg'}>
								삭제하기
							</__DeleteImageButton>
						</__ImageControlsContainer>
					</__ProfileImageContainer>
					<__InfoContainer>
						<__InfoLabel>이메일 주소</__InfoLabel>
						<__InfoBox>
							<__Info>{userInfo.email}</__Info>
						</__InfoBox>
					</__InfoContainer>

					<__InfoContainer>
						<__InfoLabel $onSelect={formState.changingName}>이름</__InfoLabel>
						{formState.changingName ? (
							<__FormContainer>
								<NameForm formState={formState} setFormState={setFormState} />
							</__FormContainer>
						) : (
							<__InfoBox>
								<__Info>{userInfo.name}</__Info>
								<__EditButton type='button' onClick={changeName}>
									변경
								</__EditButton>
							</__InfoBox>
						)}
					</__InfoContainer>

					<__InfoContainer>
						<__InfoLabel $onSelect={formState.changingPassword}>비밀번호</__InfoLabel>
						{formState.changingPassword ? (
							<__FormContainer>
								<PasswordForm formState={formState} setFormState={setFormState} />
							</__FormContainer>
						) : (
							<__InfoBox>
								<__Info>**********</__Info>
								<__EditButton type='button' onClick={changePassword}>
									변경
								</__EditButton>
							</__InfoBox>
						)}
					</__InfoContainer>
					<__LogoutButton type='button' onClick={logoutUser}>
						로그아웃
					</__LogoutButton>
					<__DeleteAccountButton type='button' onClick={handleDeleteUser}>
						회원 탈퇴
					</__DeleteAccountButton>
				</__InfoStack>
			</__PageContainer>
			<__ImageCropperModal show={showCropperModal} backdrop={'static'} keyboard={false} size={'xl'}>
				<__ImageCropperModalBody>
					{selectedImage && (
						<ImageCropper
							imgFile={selectedImage}
							setCroppedImage={setCroppedImage}
							setSelectedImage={setSelectedImage}
							closeImageCropper={closeImageCropper}
							cropper={cropper}
							setCropper={setCropper}
						/>
					)}
				</__ImageCropperModalBody>
			</__ImageCropperModal>
		</>
	);
}
