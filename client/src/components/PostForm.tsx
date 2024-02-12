import { useForm, SubmitHandler } from 'react-hook-form';
import { calendarFormFields } from '../data/constants/types/form';
import { PostFormProps } from '../data/constants/types/form';
import { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { userPostsState } from '../utils/state';
import { getPosts, postPost } from '../utils/axios';
import { CropperState } from '../data/constants/types/image';
import ImageCropper from './ImageCropper';
import {
	__FormContainer,
	__AddImageIconContainer,
	__FileInput,
	__AddImagePlaceHolderIcon,
	__Form,
	__FormLabel,
	__FormInput,
	__FormTextArea,
	__FormInputWrapper,
	__SubmitButton,
	__ImageWrapper,
	__Image,
	__FormRow,
	__FormImageCol,
	__FormInputCol,
	__FormControlsCol,
	__ImageCropperModal,
	__ImageCropperModalHeader,
	__ImageCropperModalTitle,
	__ImageCropperModalBody,
	__ImageCropperModalFooter,
	__ControlsContainer,
	__CropButton,
	__RemoveButton,
} from '../styles/__components/__PostForm';
import { useNavigate } from 'react-router-dom';
import { CropperProps } from 'react-easy-crop';

export default function PostForm({ selectedDate, handleModalClose }: PostFormProps) {
	/* ------------------ React Hook Form --------------------------------------*/

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
		setValue,
	} = useForm<calendarFormFields>({
		mode: 'onChange',
		defaultValues: {
			title: '',
			content: '',
			plant: '',
		},
	});

	/* --------------------------------------------------------*/

	const [postsState, setPostsState] = useRecoilState(userPostsState);
	const navigate = useNavigate();

	/* --------------------------------------------------------*/

	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [croppedImage, setCroppedImage] = useState<File | null>(null);
	const [croppedImageURL, setCroppedImageURL] = useState<string | null>(null);
	const [cropper, setCropper] = useState<CropperState | null>(null);
	const [showCropperModal, setShowCropperModal] = useState(false);

	useEffect(() => {
		if (selectedImage) {
			setShowCropperModal(true);
		}
	}, [selectedImage]);

	useEffect(() => {
		if (croppedImage) {
			setCroppedImageURL(URL.createObjectURL(croppedImage));
		}
	}, [croppedImage]);

	useEffect(() => {
		return () => {
			if (croppedImageURL) {
				URL.revokeObjectURL(croppedImageURL);
			}
		};
	}, [croppedImageURL]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedImage(file);
		}
	};

	/* ------------------AXIOS --------------------------------------*/
	const uploadPost: SubmitHandler<calendarFormFields> = async (values) => {
		const formData = new FormData();
		if (croppedImage) {
			formData.append('file', croppedImage);
		}
		const postData = {
			date: selectedDate,
			title: values.title,
			content: values.content,
			plant: values.plant,
		};
		formData.append('postData', JSON.stringify(postData));

		const { result, message, data } = await postPost(formData, { width: 400, height: 500 });

		if (!result) {
			alert(message);
			navigate('/signin');
			return;
		}

		fetchPosts();
		handleModalClose();
		setSelectedImage(null);
		alert(message);
		reset({
			title: '',
			content: '',
			plant: '',
		});
	};

	const fetchPosts = async () => {
		const { result, message, data } = await getPosts();

		if (!result) {
			alert(message);
			navigate('/signin');
			return;
		}

		setPostsState(data);
	};
	/* --------------------------------------------------------*/

	const imageInputRef = useRef<HTMLInputElement>(null);
	const triggerImageSelect = () => {
		if (imageInputRef.current) {
			imageInputRef.current.click();
		}
	};

	const closeImageCropper = () => {
		setShowCropperModal(false);
	};

	const openImageCropper = () => {
		setShowCropperModal(true);
	};

	const resetSelectedImage = () => {
		setSelectedImage(null);
		setCroppedImage(null);
		setCroppedImageURL(null);
		setCropper(null);
		setShowCropperModal(false);
	};

	return (
		<>
			<__FormContainer>
				<__Form onSubmit={handleSubmit(uploadPost)}>
					<__FormRow>
						<__FormImageCol xs={12} sm={12} md={12} lg={6}>
							{!croppedImageURL && (
								<__AddImageIconContainer onClick={triggerImageSelect}>
									<__AddImagePlaceHolderIcon />
									<__FileInput
										type={'file'}
										accept={'image/*'}
										onChange={handleFileChange}
										ref={imageInputRef}
									/>
								</__AddImageIconContainer>
							)}

							{croppedImageURL && (
								<__ImageWrapper>
									<__Image src={croppedImageURL} />
									<__ControlsContainer>
										<__CropButton onClick={openImageCropper} />
										<__RemoveButton onClick={resetSelectedImage} />
									</__ControlsContainer>
								</__ImageWrapper>
							)}
						</__FormImageCol>
						<__FormInputCol xs={12} sm={12} md={12} lg={6}>
							<__FormInputWrapper>
								<__FormLabel $error={errors.title ? true : false}>제목</__FormLabel>
								<__FormInput
									type={'text'}
									{...register('title', {
										required: '제목을 입력해주세요.',
										validate: {
											emptyCheck: (value) =>
												value.trim().length < 1 ? '제목을 입력해주세요.' : undefined,
										},
									})}
								/>
							</__FormInputWrapper>
							<__FormInputWrapper>
								<__FormLabel $error={errors.plant ? true : false}>반려식물 이름</__FormLabel>
								<__FormInput
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
							</__FormInputWrapper>
							<__FormInputWrapper>
								<__FormLabel $error={errors.content ? true : false}>내용</__FormLabel>
								<__FormTextArea
									{...register('content', {
										required: '내용을 입력해주세요.',
										validate: {
											emptyCheck: (value) =>
												value.trim().length < 1 ? '내용을 입력해주세요.' : undefined,
										},
									})}
								/>
							</__FormInputWrapper>
						</__FormInputCol>
						<__FormControlsCol xs={12} sm={12} md={12} lg={12}>
							<__SubmitButton type='submit' disabled={!isValid}>
								저장
							</__SubmitButton>
						</__FormControlsCol>
					</__FormRow>
				</__Form>
			</__FormContainer>
			{/* ---------Modal----------------------------------- */}
			<__ImageCropperModal
				show={showCropperModal}
				backdrop={'static'}
				keyboard={false}
				size={'xl'}
				dialogClassName='image-cropper-modal'>
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
			{/* ------------------------------------------ */}
		</>
	);
}
