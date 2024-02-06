import { useEffect, useRef, useState } from 'react';
import { PostCardProps } from '../data/constants/types/post';
import { useForm, SubmitHandler } from 'react-hook-form';
import { editPostFormFields } from '../data/constants/types/post';
import { useRecoilState } from 'recoil';
import { userPostsState } from '../utils/state';
import { patchPost, getPosts, deletePost, postPost } from '../utils/axios';
import ImageCropper from './ImageCropper';
import { CropperState } from '../data/constants/types/image';

import dayjs from 'dayjs';
import {
	__Card,
	__CardImage,
	__CardBody,
	__CardTitle,
	__CardSubtitle,
	__CardText,
	__Modal,
	__ModalHeader,
	__ModalBody,
	__ModalFooter,
	__PostImage,
	__CardImageOverlay,
	__CardCol,
	__Dropdown,
	__DropdownToggle,
	__DropdownMenu,
	__DropdownItem,
	__DotsIcon,
	__PostContainer,
	__PostInfoContainer,
	__PostImageContainer,
	__PostTitle,
	__PostPlant,
	__PostContent,
	__PostDate,
	__HeaderContainer,
	__TitleWrapper,
	__ImageCropperModal,
	__ImageCropperModalBody,
	__ImagePreview,
	__InputFileButton,
	__FileInput,
	__ImagePreviewContainer,
	__ImageEditControlsContainer,
	__CancelSelectButton,
	__CropImageButton,
	__SelectImageButton,
	__ImageOverlay,
	__Form,
	__InputContainer,
	__InputLabel,
	__Input,
	__SubmitButton,
	__CancelButton,
	__DeleteButton,
	__TextArea,
	__TextAreaContainer,
	__PostButtonsContainer,
	__Spinner,
	__PostFormContainer,
} from '../styles/__components/__PostCard';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post }: PostCardProps) {
	const [postsState, setPostsState] = useRecoilState(userPostsState);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
	const [croppedImage, setCroppedImage] = useState<File | null>(null);
	const [croppedImageURL, setCroppedImageURL] = useState<string | null>(null);
	const [cropper, setCropper] = useState<CropperState | null>(null);
	const [showCropperModal, setShowCropperModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const closeImageCropper = () => {
		setShowCropperModal(false);
	};

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (croppedImage) {
			setCroppedImageURL(URL.createObjectURL(croppedImage));
		}

		return () => {
			if (croppedImageURL) {
				URL.revokeObjectURL(croppedImageURL);
			}
		};
	}, [croppedImage]);

	useEffect(() => {
		if (selectedImage) {
			const url = URL.createObjectURL(selectedImage);
			setSelectedImageURL(url);
		}
	}, [selectedImage]);

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setCropper(null);
			setSelectedImage(event.target.files[0]);
			setShowCropperModal(true);
		}
	};

	const clearEditForm = () => {
		setIsEditing(false);
		setSelectedImage(null);
		setSelectedImageURL(null);
		setCroppedImage(null);
		setCroppedImageURL(null);
		setCropper(null);
		reset(post);
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<editPostFormFields>({
		mode: 'onChange',
		defaultValues: post,
	});

	const editPost: SubmitHandler<editPostFormFields> = async (values) => {
		setLoading(true);

		const formData = new FormData();
		if (croppedImage) {
			formData.append('file', croppedImage);
		}
		const postData = {
			date: values.date,
			title: values.title,
			content: values.content,
			plant: values.plant,
		};
		formData.append('postData', JSON.stringify(postData));

		const { result, message, data } = await patchPost(post.id, formData, { width: 300, height: 400 });
		if (result) {
			const response = await getPosts();
			clearEditForm();
			setPostsState(response.data);
			setLoading(false);
		}
		if (!result) {
			setLoading(false);
			alert(message);
			navigate('/signin');
		}
	};

	const handleDeletePost = async () => {
		setLoading(true);
		const { result, message, data } = await deletePost(post.id);
		if (result) {
			const response = await getPosts();
			clearEditForm();
			setPostsState(response.data);
			setLoading(false);
			alert(message);
		}
		if (!result) {
			setLoading(false);
			alert(message);
			navigate('/signin');
		}
	};

	useEffect(() => {
		clearEditForm();
	}, [post]);

	const imageInputRef = useRef<HTMLInputElement>(null);

	const triggerImageSelect = () => {
		if (imageInputRef.current) {
			imageInputRef.current.click();
		}
	};

	const clearImage = () => {
		setSelectedImage(null);
		setSelectedImageURL(null);
		setCroppedImage(null);
		setCroppedImageURL(null);
	};

	const resetFile = () => {
		if (imageInputRef.current) {
			imageInputRef.current.value = '';
		}
	};

	return (
		<>
			<__CardCol>
				<__Card onClick={handleShowModal}>
					{post.img && <__CardImage variant='top' src={post.img} />}
					<__CardImageOverlay>
						<__CardBody>
							<__CardTitle>{post.title}</__CardTitle>
							<__CardSubtitle>{post.plant}</__CardSubtitle>
						</__CardBody>
					</__CardImageOverlay>
				</__Card>
			</__CardCol>
			<__Modal
				show={showModal}
				onHide={handleCloseModal}
				backdrop={isEditing ? 'static' : true}
				size={'lg'}
				onExited={clearEditForm}
				dialogClassName='custom-modal'>
				<__ModalHeader>
					{!isEditing && (
						<__Dropdown>
							<__DropdownToggle>
								<__DotsIcon />
							</__DropdownToggle>
							<__DropdownMenu>
								<__DropdownItem
									onClick={() => {
										setIsEditing(true);
									}}>
									수정
								</__DropdownItem>
								<__DropdownItem onClick={handleDeletePost}>삭제</__DropdownItem>
							</__DropdownMenu>
						</__Dropdown>
					)}
				</__ModalHeader>
				<__ModalBody>
					{isEditing ? (
						<__PostFormContainer>
							<__ImagePreviewContainer>
								{(post.img || croppedImageURL) && <__ImagePreview src={croppedImageURL || post.img} />}
								<__ImageOverlay>
									<__ImageEditControlsContainer>
										<__SelectImageButton onClick={triggerImageSelect} />
										{selectedImage && (
											<>
												<__CropImageButton
													onClick={() => {
														setShowCropperModal(true);
													}}
												/>
												<__CancelSelectButton onClick={clearImage} />
											</>
										)}
									</__ImageEditControlsContainer>

									<__FileInput
										type={'file'}
										accept={'image/*'}
										onChange={onFileChange}
										onClick={resetFile}
										ref={imageInputRef}
									/>
								</__ImageOverlay>
							</__ImagePreviewContainer>

							<__Form onSubmit={handleSubmit(editPost)}>
								<__InputContainer>
									<__InputLabel>날짜</__InputLabel>
									<__Input
										type={'date'}
										{...register('date', {
											required: '날짜를 선택해주세요',
											setValueAs: (value) => dayjs(value).format('YYYY-MM-DD'),
										})}
										min={dayjs(new Date(2020, 0, 1)).format('YYYY-MM-DD')}
										max={dayjs(new Date()).format('YYYY-MM-DD')}
									/>
								</__InputContainer>
								<__InputContainer>
									<__InputLabel>제목</__InputLabel>

									<__Input
										type={'text'}
										{...register('title', {
											required: '제목을 입력해주세요.',
											validate: {
												emptyCheck: (value) =>
													value.trim().length < 1 ? '제목을 입력해주세요.' : undefined,
											},
										})}
									/>
								</__InputContainer>
								<__InputContainer>
									<__InputLabel>반려식물 이름</__InputLabel>

									<__Input
										type={'text'}
										{...register('plant', {
											required: '반려 식물의 이름을 입력해주세요.',
											validate: {
												emptyCheck: (value) =>
													value.trim().length < 1
														? '반려 식물의 이름을 입력해주세요.'
														: undefined,
											},
										})}
									/>
								</__InputContainer>
								<__TextAreaContainer>
									<__InputLabel>내용</__InputLabel>

									<__TextArea
										{...register('content', {
											required: '내용을 입력해주세요.',
											validate: {
												emptyCheck: (value) =>
													value.trim().length < 1 ? '내용을 입력해주세요.' : undefined,
											},
										})}
									/>
								</__TextAreaContainer>
								<__PostButtonsContainer>
									{loading ? (
										<__Spinner />
									) : (
										<>
											<__SubmitButton
												type={'button'}
												onClick={handleSubmit(editPost)}
												disabled={!isValid}>
												저장
											</__SubmitButton>
											<__CancelButton type={'button'} onClick={clearEditForm}>
												취소
											</__CancelButton>
											<__DeleteButton type={'button'} onClick={handleDeletePost}>
												삭제
											</__DeleteButton>
										</>
									)}
								</__PostButtonsContainer>
							</__Form>
						</__PostFormContainer>
					) : (
						<__PostContainer fluid={'md'}>
							<__PostImageContainer>
								<__PostImage src={post.img} />
							</__PostImageContainer>

							<__HeaderContainer>
								<__TitleWrapper>
									<__PostTitle>{post.title}</__PostTitle>
									<__PostPlant>{post.plant}</__PostPlant>
								</__TitleWrapper>

								<__PostDate>{post.date}</__PostDate>
							</__HeaderContainer>

							<__PostInfoContainer>
								<__PostContent>{post.content}</__PostContent>
							</__PostInfoContainer>
						</__PostContainer>
					)}
				</__ModalBody>
			</__Modal>

			<__ImageCropperModal show={showCropperModal} backdrop={'static'} keyboard={false} size={'xl'}>
				<__ImageCropperModalBody>
					{selectedImage && (
						<ImageCropper
							imgFile={selectedImage}
							setSelectedImage={setSelectedImage}
							setCroppedImage={setCroppedImage}
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
