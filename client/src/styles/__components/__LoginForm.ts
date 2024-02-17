import styled from 'styled-components';
import * as CSS from '../constants';

export const __FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`;

export const __Title = styled.h1`
	font-size: 2rem;
	margin-bottom: 2rem;
`;
export const __Form = styled.form`
	width: 80%;
`;

export const __Label = styled.div`
	font-size: 0.8rem;
	color: ${CSS.BLACK};
	margin-bottom: 0.8rem;
`;

export const __InputContainer = styled.div`
	margin-bottom: 2rem;
`;

export const __InputWrapper = styled.div<{ $highlight?: boolean }>`
	padding-bottom: 0.6rem;
	border-bottom: ${(props) => (props.$highlight ? '2px solid black' : '2px solid lightgrey')};
	margin-bottom: 0.2rem;
`;

export const __Input = styled.input`
	width: 100%;
	background-color: ${CSS.BACKGROUND_PRIMARY};
	border: none;
	outline: none;
	border-radius: 0;
	&:active {
		background-color: ${CSS.BACKGROUND_PRIMARY};
	}
`;
export const __ValidationContainer = styled.div`
	height: 0.8rem;
`;
export const __Validation = styled.span`
	color: red;
	font-size: 0.8rem;
`;
export const __LoginButton = styled.button`
	border: none;
	border-radius: 12px;
	color: ${CSS.BACKGROUND_PRIMARY};
	background-color: ${CSS.ACCENT_PRIMARY};
	width: 100%;
	height: 2rem;
	font-size: 1.2rem;

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
