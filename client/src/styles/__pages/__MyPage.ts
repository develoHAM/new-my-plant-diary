import styled from 'styled-components';
import * as CSS from '../constants';

// react-bootstrap
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';

export const __PageContainer = styled(Container)`
	width: 100%;
	min-height: calc(100vh - 3rem);
	background-color: white;
	display: flex;
	justify-content: center;
`;

export const __InfoStack = styled(Stack)`
	max-width: 40rem;
	margin-top: 3rem;
	padding: 5% 8% 0 8%;
	display: flex;
`;

export const __TitleContainer = styled.div`
	margin-bottom: 2rem;
`;

export const __Title = styled.h1`
	font-size: 1.4rem;
`;

export const __Line = styled.hr`
	border: 2px solid black;
	opacity: 1;
	margin: 0;
`;

export const __ProfileImageContainer = styled(Stack)`
	justify-content: space-between;
	margin-bottom: 2rem;
`;

export const __FileInputLabel = styled.label`
	padding: 0.6rem;
	border-radius: 12px;
	color: ${CSS.GREEN_SECONDARY};
	border: none;
	background-color: ${CSS.GREEN_SAGE};

	&:hover {
		background-color: ${CSS.GREEN_SECONDARY};
		color: white;
	}
`;

export const __FileInput = styled.input`
	display: none;
`;

export const __ProfileImage = styled(Image)`
	width: 100px;
	height: 100px;
`;

export const __InfoContainer = styled.div`
	width: 100%;
	margin-bottom: 3rem;
	display: flex;
	flex-direction: column;
`;

export const __InfoLabel = styled.label<{ $onSelect?: boolean }>`
	font-size: 0.8rem;
	color: ${(props) => (props.$onSelect ? 'black' : 'grey')};
	margin-bottom: 0.8rem;
`;

export const __InfoBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 2rem;
	padding-bottom: 0.6rem;
	border-bottom: 2px solid black;
`;

export const __Info = styled.span``;

export const __EditButton = styled.button`
	color: ${CSS.GREEN_SECONDARY};
	border: none;
	border-radius: 12px;
	font-size: 0.8rem;
	padding: 0.4rem;
	background-color: ${CSS.GREEN_SAGE};

	&:hover {
		background-color: ${CSS.GREEN_SECONDARY};
		color: white;
	}
`;

export const __FormContainer = styled.div``;

export const __LogoutButton = styled.button`
	margin-top: 2rem;
	color: ${CSS.WHITE};
	border: none;
	border-radius: 12px;
	width: 100%;
	padding: 0.4rem;
	height: 2rem;
	background-color: ${CSS.GREEN_SECONDARY};
	&:hover {
		background-color: ${CSS.GREEN_PRIMARY};
	}
`;

export const __DeleteAccountButton = styled.button`
	margin-top: 2rem;
	color: ${CSS.WHITE};
	border: none;
	border-radius: 12px;
	width: 100%;
	padding: 0.4rem;
	margin-bottom: 2rem;
	height: 2rem;
	background-color: ${CSS.GREEN_SECONDARY};
	&:hover {
		background-color: ${CSS.GREEN_PRIMARY};
	}
`;

export const __ImageCropperModal = styled(Modal)``;
export const __ImageCropperModalBody = styled(Modal.Body)``;
