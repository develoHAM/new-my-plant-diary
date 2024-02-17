import { useState } from 'react';
import { PostCardProps } from '../data/constants/types/post';
import { useRecoilState } from 'recoil';
import { userPostsState } from '../utils/state';
import { getPosts, deletePost } from '../utils/axios';
import PostCardEdit from './PostCardEdit';
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

export default function PostCard({ post }: PostCardProps) {
	const [postsState, setPostsState] = useRecoilState(userPostsState);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const navigate = useNavigate();

	const handleShowModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleDeletePost = async () => {
		if (!window.confirm('게시글을 삭제 하시겠습니까?')) {
			return;
		}
		setLoading(true);
		const { result, message, data } = await deletePost(post.id);
		if (result) {
			const response = await getPosts();
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

	return (
		<>
			<__CardCol>
				<__Card onClick={handleShowModal}>
					{post.img ? <__CardImage variant='top' src={post.img} /> : <__CardDate>{post.date}</__CardDate>}
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
				keyboard={!isEditing}
				dialogClassName={'custom-modal'}>
				{!isEditing && (
					<__ModalHeader>
						<__Dropdown>
							<__DropdownToggle>{loading ? <__Spinner /> : <__DotsIcon />}</__DropdownToggle>
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
					</__ModalHeader>
				)}
				<__ModalBody>
					{isEditing ? (
						<PostCardEdit post={post} setIsEditing={setIsEditing} />
					) : (
						<__PostContainer fluid={'md'}>
							<__PostImageContainer>{post.img && <__PostImage src={post.img} />}</__PostImageContainer>

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
		</>
	);
}
