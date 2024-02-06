import { styled } from 'styled-components';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import * as CSS from '../constants';

import { FaCrop } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaImage } from 'react-icons/fa';

export const __CardCol = styled(Col)`
	padding: 0;
	display: flex;
	justify-content: center;
`;

export const __CardImageOverlay = styled(Card.ImgOverlay)`
	display: none;
	background: rgba(0, 0, 0, 0.5);
	color: ${CSS.WHITE};
`;
export const __Card = styled(Card)`
	width: 100%;
	max-width: 200px;
	aspect-ratio: 4/5;
	border: none;
	cursor: pointer;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	&:hover {
		& > ${__CardImageOverlay} {
			display: block;
		}
	}
`;
export const __CardImage = styled(Card.Img)`
	width: 100%;
	height: 100%;
`;

export const __CardBody = styled(Card.Body)``;
export const __CardTitle = styled(Card.Title)`
	font-size: 1rem;
	margin-bottom: 1rem;
`;
export const __CardSubtitle = styled(Card.Subtitle)`
	font-size: 0.8rem;
	margin-bottom: 1rem;
`;
export const __CardText = styled(Card.Text)``;

export const __Modal = styled(Modal)``;

export const __Dropdown = styled(Dropdown)`
	margin-left: auto;
`;
export const __DropdownToggle = styled(Dropdown.Toggle)`
	border: none;
	width: auto;
	padding: 0;
	line-height: 0;
	background-color: white;

	&:hover {
		background-color: white;
	}

	&.show,
	&.active,
	&:checked,
	&:first-child:active {
		background-color: white !important;
	}

	&::after {
		display: none;
	}
`;
export const __DropdownMenu = styled(Dropdown.Menu)`
	min-width: 2rem;
`;
export const __DropdownItem = styled(Dropdown.Item)`
	font-size: 1rem;
`;

export const __DotsIcon = styled(HiDotsHorizontal)`
	color: black;
	font-size: 2rem;
`;

export const __ModalHeader = styled(Modal.Header)`
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-start;
	border: none;
	padding: 1rem 1rem 0 1rem;
`;

export const __ModalBody = styled(Modal.Body)`
	padding: 1rem 0 0 0;
	display: flex;
	flex-direction: column;
	height: 85vh;
	max-height: 85vh;
	overflow-y: scroll;
`;
export const __ModalFooter = styled(Modal.Footer)`
	border: none;
	padding: 0 3rem;
`;

export const __PostContainer = styled(Container)`
	width: 100%;
	padding: 0 50px;
	margin: 0;
	color: #303131;
`;

export const __PostFormContainer = styled(Container)`
	width: 100%;
	padding: 0 50px;
	margin: 0;
	color: #303131;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const __PostImageContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 2rem;
`;

export const __PostImage = styled(Image)`
	width: 400px;
	aspect-ratio: 4/5;
`;

export const __HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
	height: 2rem;
`;

export const __TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`;

export const __PostTitle = styled.h1`
	font-size: 1.4rem;
	margin: 0;
`;
export const __PostPlant = styled.h2`
	font-size: 1.2rem;
	margin: 0;
`;
export const __PostDate = styled.h3`
	font-size: 1rem;
	margin: 0;
`;

export const __PostInfoContainer = styled.div``;

export const __PostContent = styled.p`
	font-size: 1rem;
`;

export const __ImageCropperModal = styled(Modal)``;
export const __ImageCropperModalBody = styled(Modal.Body)``;

export const __ImageEditControlsContainer = styled.div`
	margin-left: auto;
	width: 36%;
	display: flex;
	justify-content: flex-end;
`;

export const __CancelSelectButton = styled(MdCancel)`
	flex: 0 0 1/3;
	color: white;
	font-size: 1rem;
	margin: 0 0.2rem;
	cursor: pointer;
`;
export const __CropImageButton = styled(FaCrop)`
	flex: 0 0 1/3;
	color: white;
	font-size: 1rem;
	margin: 0 0.2rem;
	cursor: pointer;
`;
export const __SelectImageButton = styled(FaImage)`
	flex: 0 0 1/3;

	color: white;
	font-size: 1rem;
	margin: 0 0.2rem;
	cursor: pointer;
`;

export const __ImageOverlay = styled.div`
	width: 200px;
	height: 250px;
	background-color: black;
	opacity: 0.6;
	display: none;
	position: absolute;
	top: 0;
	padding: 0.6rem 0.4rem 0.4rem 0.4rem;
`;

export const __ImagePreviewContainer = styled.div`
	width: 200px;
	height: 250px;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	margin-bottom: 2rem;

	&:hover {
		& > ${__ImageOverlay} {
			display: block;
		}
	}
`;
export const __ImagePreview = styled(Image)`
	width: 200px;
	aspect-ratio: 4/5;
`;

export const __InputFileButton = styled.button`
	border: none;

	border-radius: 12px;
	color: ${CSS.WHITE};
	background-color: ${CSS.GREEN_SECONDARY};
	width: 200px;
	height: 2rem;
	font-size: 1rem;

	&:hover {
		background-color: ${CSS.GREEN_PRIMARY};
	}
`;
export const __FileInput = styled.input`
	display: none;
`;

export const __Form = styled.form`
	width: 200px;
`;
export const __InputContainer = styled.div`
	border-bottom: 1px solid black;
	margin-bottom: 2rem;
`;

export const __InputLabel = styled.div`
	font-size: 0.8rem;
	margin-bottom: 0.8rem;
`;
export const __Input = styled.input`
	padding-left: 0.4rem;
	padding-top: 0.2rem;
	font-size: 1rem;
	width: 100%;
	border: none;
	padding-bottom: 0.4rem;
	&:focus {
		border-radius: 0.2rem;
		outline: 2px solid ${CSS.GREEN_SAGE};
	}
`;
export const __TextAreaContainer = styled.div`
	margin-bottom: 2rem;
`;
export const __TextArea = styled.textarea`
	padding-left: 0.4rem;
	padding-top: 0.2rem;
	width: 100%;

	&:focus {
		border-radius: 0.2rem;
		outline: 2px solid ${CSS.GREEN_SAGE};
	}
`;
export const __PostButtonsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
export const __SubmitButton = styled.button`
	border: none;
	border-radius: 12px;
	padding: 0.6rem;
	color: ${CSS.WHITE};
	font-size: 1rem;
	background-color: ${CSS.GREEN_SECONDARY};

	&:disabled {
		background-color: lightgrey;
		&:hover {
			background-color: lightgrey;
		}
	}
`;
export const __CancelButton = styled.button`
	border: none;
	border-radius: 12px;
	padding: 0.6rem;
	color: ${CSS.WHITE};
	font-size: 1rem;
	background-color: ${CSS.GREEN_SECONDARY};
	&:hover {
		background-color: ${CSS.GREEN_PRIMARY};
	}
`;
export const __DeleteButton = styled.button`
	border: none;
	border-radius: 12px;
	padding: 0.6rem;
	color: ${CSS.WHITE};
	font-size: 1rem;
	background-color: ${CSS.GREEN_SECONDARY};
	&:hover {
		background-color: ${CSS.GREEN_PRIMARY};
	}
`;

export const __Spinner = styled(Spinner)`
	color: ${CSS.GREEN_SAGE};
	margin: auto;
`;
