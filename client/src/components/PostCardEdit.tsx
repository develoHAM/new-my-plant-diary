import { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PostCardEditProps, PostEdit, post } from '../data/constants/types/post';
import { editPostFormFields } from '../data/constants/types/post';
import { useRecoilState } from 'recoil';
import { userPostsState } from '../utils/state';
import { putPost, getPosts, deletePost, postPost } from '../utils/axios';
import ImageCropper from './ImageCropper';
import { CropperState } from '../data/constants/types/image';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

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
	__DeleteOriginalImageButton,
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
	__PostFormRow,
	__PostFormImageCol,
	__PostFormInfoCol,
	__PostFormControlsCol,
	__HeaderInputContainer,
	__CardDate,
	__NoImage,
} from '../styles/__components/__PostCard';

export default function PostCardEdit({ post, setIsEditing }: PostCardEditProps) {
	const [postEdit, setPostEdit] = useState<PostEdit>(post);
	const [loading, setLoading] = useState(false);
	const [postsState, setPostsState] = useRecoilState(userPostsState);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	// const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
	const [croppedImage, setCroppedImage] = useState<File | null>(null);
	const [croppedImageURL, setCroppedImageURL] = useState<string | null>(null);
	const [cropper, setCropper] = useState<CropperState | null>(null);
	const [showCropperModal, setShowCropperModal] = useState(false);
	const navigate = useNavigate();
	const closeImageCropper = () => {
		setShowCropperModal(false);
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
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleCancelEdit = () => {
		setSelectedImage(null);
		// setSelectedImageURL(null);
		setCroppedImage(null);
		setCroppedImageURL(null);
		setCropper(null);
		setIsEditing(false);
		reset(post);
	};

	const triggerImageSelect = () => {
		if (imageInputRef.current) {
			imageInputRef.current.click();
		}
	};

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setCropper(null);
			setSelectedImage(event.target.files[0]);
			setShowCropperModal(true);
		}
	};

	const resetFile = () => {
		if (imageInputRef.current) {
			imageInputRef.current.value = '';
		}
	};

	const clearImage = () => {
		setSelectedImage(null);
		// setSelectedImageURL(null);
		setCroppedImage(null);
		setCroppedImageURL(null);
	};

	const deleteOriginalImg = () => {
		setPostEdit({ ...postEdit, img: null });
	};

	// axios --------------------------------------------------------------------

	const editPost: SubmitHandler<editPostFormFields> = async (values) => {
		setLoading(true);
		if (!postEdit) {
			return;
		}
		const formData = new FormData();
		const postData = {
			date: values.date,
			title: values.title,
			content: values.content,
			plant: values.plant,
			img: postEdit.img,
		};
		formData.append('postData', JSON.stringify(postData));
		if (croppedImage) {
			formData.append('file', croppedImage);
		}
		const { result, message, data } = await putPost(post.id, formData);
		if (result) {
			const response = await getPosts();
			handleCancelEdit();
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
		if (!window.confirm('게시글을 삭제 하시겠습니까?')) {
			return;
		}
		setLoading(true);
		if (!postEdit) {
			return;
		}
		const { result, message, data } = await deletePost(post.id);
		if (result) {
			const response = await getPosts();
			handleCancelEdit();
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

	// useEffect ----------------

	// useEffect(() => {
	// 	if (selectedImage) {
	// 		const url = URL.createObjectURL(selectedImage);
	// 		setSelectedImageURL(url);
	// 	}
	// }, [selectedImage]);

	useEffect(() => {
		console.log('postEdit', postEdit);
		if (croppedImage) {
			setCroppedImageURL(URL.createObjectURL(croppedImage));
		}

		return () => {
			if (croppedImageURL) {
				URL.revokeObjectURL(croppedImageURL);
			}
		};
	}, [croppedImage]);

	return (
		<>
			<__PostFormContainer>
				<__Form onSubmit={handleSubmit(editPost)}>
					<__PostFormRow>
						<__PostFormImageCol xs={12} sm={12} md={12} lg={6}>
							<__ImagePreviewContainer>
								{postEdit.img || croppedImageURL ? (
									<__ImagePreview src={croppedImageURL || postEdit.img || ''} />
								) : (
									<__NoImage>사진을 올려보세요.</__NoImage>
								)}
								<__ImageOverlay>
									<__ImageEditControlsContainer>
										<__SelectImageButton onClick={triggerImageSelect} />
										{postEdit.img && !selectedImage && (
											<__DeleteOriginalImageButton onClick={deleteOriginalImg} />
										)}
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
						</__PostFormImageCol>

						<__PostFormInfoCol xs={12} sm={12} md={12} lg={6}>
							<__HeaderInputContainer>
								<__InputContainer>
									<__InputLabel $error={errors.date ? true : false}>날짜</__InputLabel>
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
									<__InputLabel $error={errors.title ? true : false}>제목</__InputLabel>

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
									<__InputLabel $error={errors.plant ? true : false}>반려식물 이름</__InputLabel>

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
									<__InputLabel $error={errors.content ? true : false}>내용</__InputLabel>

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
							</__HeaderInputContainer>
						</__PostFormInfoCol>
						<__PostFormControlsCol xs={12} sm={12} md={12} lg={12}>
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
										<__CancelButton type={'button'} onClick={handleCancelEdit}>
											취소
										</__CancelButton>
										<__DeleteButton type={'button'} onClick={handleDeletePost}>
											삭제
										</__DeleteButton>
									</>
								)}
							</__PostButtonsContainer>
						</__PostFormControlsCol>
					</__PostFormRow>
				</__Form>
			</__PostFormContainer>
			<__ImageCropperModal
				show={showCropperModal}
				backdrop={'static'}
				keyboard={false}
				size={'xl'}
				dialogClassName={'image-cropper-modal'}>
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
