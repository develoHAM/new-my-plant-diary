import styled from 'styled-components';
import * as CSS from '../constants';
import { AiFillPicture } from 'react-icons/ai';
import { FaCrop } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';

// react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';

export const __FormContainer = styled.div`
	width: 100%;
	height: 100%;
	max-height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const __ImageContainer = styled.div`
	width: 200px;
	height: 250px;
	background-color: blue;
	display: flex;
	justify-content: center;
`;

export const __FormRow = styled(Row)``;
export const __BasicInfoCol = styled(Col)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-bottom: 1rem;
`;
export const __ImageCol = styled(Col)`
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
	height: 250px;
	padding: 0;
`;
export const __TextAreaCol = styled(Col)``;

export const __AddImageIconContainer = styled.div`
	width: 200px;
	height: 250px;
	background-color: lightgrey;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const __AddImagePlaceHolderIcon = styled(AiFillPicture)`
	width: 100%;
	color: grey;
	font-size: 8rem;

	&:hover {
		color: black;
	}
`;

export const __ControlsContainer = styled.div`
	display: none;
	position: absolute;
	background-color: black;
	width: 200px;
	height: 250px;
	opacity: 0.8;
	justify-content: flex-end;
	padding: 0.2rem;
`;

export const __ImageWrapper = styled.div`
	width: 200px;
	height: 250px;
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	transition: background-color 0.3s;

	&:hover {
		outline: 2px solid ${CSS.GREEN_SAGE};
		background-color: #00000080;

		& > ${__ControlsContainer} {
			display: flex;
		}
	}
`;

export const __Image = styled.img`
	width: 200px;
	height: auto;
	aspect-ratio: 4/5;
	z-index: 0;
`;

export const __CropButton = styled(FaCrop)`
	font-size: 1rem;
	cursor: pointer;
	color: white;
	margin: 0.2rem;
`;
export const __RemoveButton = styled(MdCancel)`
	font-size: 1rem;
	cursor: pointer;
	color: white;
	margin: 0.2rem;
`;

export const __FileInput = styled.input`
	display: none;
`;

export const __Form = styled.form`
	width: 50%;
`;
export const __FormLabel = styled.div`
	margin-bottom: 1rem;
	font-size: 0.8rem;
	color: black;
`;
export const __FormInput = styled.input`
	width: 100%;
	border: none;
	outline: none;
	padding-bottom: 0.4rem;
	border-bottom: 1px solid lightgrey;

	&:focus {
		border-bottom: 1px solid black;
	}
`;
export const __FormTextArea = styled.textarea`
	padding-left: 0.4rem;
	padding-top: 0.4rem;
	font-size: 1rem;
	width: 100%;
	border-radius: 4px;
	border: 1px solid lightgrey;

	&:focus {
		outline: 1px solid green;
	}
`;
export const __FormInputWrapper = styled.div`
	margin-bottom: 2rem;
`;
export const __ValidationContainer = styled.div``;
export const __Validation = styled.span``;
export const __SubmitButton = styled.button`
	margin-top: 1rem;
	border: none;
	border-radius: 12px;
	color: ${CSS.WHITE};
	background-color: ${CSS.GREEN_SECONDARY};
	width: 100%;
	height: 2rem;
	font-size: 1rem;

	&:disabled {
		background-color: lightgrey;
		&:hover {
			background-color: lightgrey;
		}
	}

	&:hover {
		background-color: ${CSS.GREEN_PRIMARY};
	}
`;

export const __ImageCropperModal = styled(Modal)``;
export const __ImageCropperModalHeader = styled(Modal.Header)``;
export const __ImageCropperModalTitle = styled(Modal.Title)``;
export const __ImageCropperModalBody = styled(Modal.Body)``;
export const __ImageCropperModalFooter = styled(Modal.Footer)``;
