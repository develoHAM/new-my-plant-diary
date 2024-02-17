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

export const __FormContainer = styled(Container)`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0;
`;
export const __Form = styled.form`
	width: 100%;
`;
export const __FormRow = styled(Row)`
	height: 100%;
	padding-top: 2rem;
`;

export const __FormImageCol = styled(Col)`
	display: flex;
	justify-content: center;
	margin-bottom: 2rem;
`;

export const __AddImageIconContainer = styled.div`
	width: 100%;
	aspect-ratio: 4/5;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: lightgrey;
`;
export const __AddImagePlaceHolderIcon = styled(AiFillPicture)`
	color: grey;
	font-size: 8rem;
	&:hover {
		color: ${CSS.BLACK};
	}
`;
export const __FileInput = styled.input`
	display: none;
`;

export const __ControlsContainer = styled.div`
	display: none;
	position: absolute;
	background-color: ${CSS.BLACK};
	width: 100%;
	aspect-ratio: 4/5;
	opacity: 0.6;
	justify-content: flex-end;
	padding: 0.2rem;
`;

export const __ImageWrapper = styled.div`
	width: 100%;
	background-color: ${CSS.BLACK};
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	transition: background-color 0.3s;

	&:hover {
		background-color: ${CSS.BLACK};

		& > ${__ControlsContainer} {
			display: flex;
		}
	}
`;

export const __Image = styled.img`
	width: 100%;
	aspect-ratio: 4/5;
	z-index: 0;
`;

export const __CropButton = styled(FaCrop)`
	font-size: 1rem;
	cursor: pointer;
	color: ${CSS.BACKGROUND_PRIMARY};
	margin: 0.2rem;
`;
export const __RemoveButton = styled(MdCancel)`
	font-size: 1rem;
	cursor: pointer;
	color: ${CSS.BACKGROUND_PRIMARY};
	margin: 0.2rem;
`;

export const __FormControlsCol = styled(Col)`
	display: flex;
	justify-content: center;
	justify-self: end;
`;

export const __SubmitButton = styled.button`
	border: none;
	border-radius: 12px;
	color: ${CSS.BACKGROUND_PRIMARY};
	background-color: ${CSS.ACCENT_PRIMARY};
	max-width: 200px;
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
		background-color: ${CSS.ACCENT_SECONDARY};
	}
`;

// -------------------------------------------
export const __FormInputCol = styled(Col)`
	margin-bottom: 2rem;
`;

export const __FormInputWrapper = styled.div`
	margin-bottom: 2rem;
`;

export const __FormLabel = styled.div<{ $error?: Boolean }>`
	margin-bottom: 1rem;
	font-size: 0.8rem;
	color: ${(props) => (props.$error ? 'red' : `${CSS.BLACK}`)};

	&::after {
		content: ${(props) => (props.$error ? '"*"' : 'none')};
	}
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
	padding: 0.4rem;
	width: 100%;
	resize: none;
	height: 6rem;
	border: 2px solid ${CSS.ACCENT_SECONDARY};
	border-radius: 0.2rem;
	&:focus {
		border: 2px solid ${CSS.ACCENT_PRIMARY};

		border-radius: 0.2rem;
		outline: none;
	}
`;

// --------------------------------------------------------

export const __ImageCropperModal = styled(Modal)``;
export const __ImageCropperModalHeader = styled(Modal.Header)``;
export const __ImageCropperModalTitle = styled(Modal.Title)``;
export const __ImageCropperModalBody = styled(Modal.Body)``;
export const __ImageCropperModalFooter = styled(Modal.Footer)``;
