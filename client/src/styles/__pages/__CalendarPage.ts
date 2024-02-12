import styled from 'styled-components';
import * as CSS from '../constants';
import { IoMdClose } from 'react-icons/io';

// react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

export const __PageContainer = styled(Container)`
	padding: 3rem 0 0 0;
	width: 100%;
	background-color: white;
	position: relative;
	margin: 0;
`;

export const __PageRow = styled(Row)`
	/* padding-top: 2rem; */
	min-height: calc(100vh - 3rem);
	overflow-y: auto;
`;

export const __CalendarCol = styled(Col)`
	display: flex;
	align-items: center;
	padding: 0;
	margin: 0;
`;

export const __CalendarContainer = styled(Container)`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0;
`;

export const __PostsCol = styled(Col)`
	display: flex;
	align-items: center;
	padding: 0;
	min-height: calc(100vh - 6rem);
`;

export const __PostsContainer = styled(Container)`
	height: 630px;
	max-height: calc(100vh - 3rem);
	overflow: auto;
	padding-top: 2rem;
	margin: auto;
`;

export const __PostsRow = styled(Row)`
	padding: 0;
	margin-left: auto;
	margin-right: auto;
`;

export const __Date = styled.div`
	width: 100%;
	margin-bottom: 2rem;
	text-align: right;
	font-size: 1rem;
	font-weight: 800;
`;

export const __NoPost = styled.div`
	font-size: 1.2rem;
	text-align: center;
	width: 100%;
`;

// MODAL --------------------------------------------------

export const __ModalButton = styled.button`
	margin-top: 4rem;
	color: white;
	border: none;
	border-radius: 12px;
	padding: 0.6rem;
	width: 10rem;
	font-size: 1.2rem;
	background-color: ${CSS.GREEN_SECONDARY};
	&:hover {
		background-color: ${CSS.GREEN_PRIMARY};
	}
`;

export const __Modal = styled(Modal)`
	max-width: 100vw;
`;

export const __ModalHeader = styled(Modal.Header)`
	height: 5%;
	display: flex;
	justify-content: center;
	border: none;
	padding: 0;
`;
export const __ModalCloseButton = styled(IoMdClose)`
	color: grey;
	position: absolute;
	font-size: 1.8rem;
	top: 1rem;
	right: 1rem;
	&:hover {
		color: black;
	}
`;
export const __ModalTitle = styled(Modal.Title)`
	font-size: 1rem;
	background-color: ${CSS.GREEN_SAGE};
	padding: 0.2rem 0.8rem;
	border-radius: 12px;
`;

export const __ModalBody = styled(Modal.Body)`
	height: 95%;
	display: flex;
	justify-content: center;
	padding: 0;
	overflow-y: auto;
`;
export const __ModalFooter = styled(Modal.Footer)``;
