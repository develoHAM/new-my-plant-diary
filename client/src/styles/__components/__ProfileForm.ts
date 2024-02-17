import styled from 'styled-components';
import * as CSS from '../constants';

export const __FormContainer = styled.div`
	width: 100%;
	max-height: 100%;
	display: flex;
	flex-direction: column;
`;

export const __Form = styled.form``;

export const __InfoInput = styled.input`
	width: 100%;
	height: 2rem;
	border: none;
	background-color: ${CSS.BACKGROUND_PRIMARY};
	outline: none;
	padding-bottom: 0.6rem;
	border-bottom: 2px solid black;
`;

export const __ErrorMessageContainer = styled.div`
	height: 1rem;
	margin-bottom: 1rem;
`;

export const __ErrorMessage = styled.span`
	/* font-family: 'TAEBAEKmilkyway'; */
	font-weight: 300;
	color: red;
	font-size: 0.8rem;
`;

export const __ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

export const __CancelButton = styled.button`
	border: none;
	border-radius: 12px;
	font-size: 0.8rem;
	padding: 0.8rem;
	color: ${CSS.BACKGROUND_PRIMARY};

	background-color: ${CSS.ACCENT_PRIMARY};
	margin-right: 1rem;
	&:hover {
		background-color: ${CSS.ACCENT_SECONDARY};
	}
`;

export const __ConfirmButton = styled.button`
	border: none;
	border-radius: 12px;
	font-size: 0.8rem;
	padding: 0.8rem;
	color: ${CSS.BACKGROUND_PRIMARY};
	background-color: ${CSS.ACCENT_PRIMARY};
	margin-left: 1rem;
	&:hover {
		background-color: ${CSS.ACCENT_SECONDARY};
	}
`;

export const __PwConfirmLabel = styled.div`
	font-size: 0.8rem;
	color: black;
	margin-bottom: 0.8rem;
`;
