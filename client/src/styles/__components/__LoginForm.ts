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
	margin-bottom: 3rem;
`;
export const __Form = styled.form`
	width: 60%;
`;

export const __Label = styled.div`
	font-size: 0.8rem;
	color: black;
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
	background-color: white;
	border: none;
	outline: none;

	&:active {
		background-color: white;
	}
`;
export const __ValidationContainer = styled.div`
	height: 0.8rem;
`;
export const __Validation = styled.span`
	font-family: 'TAEBAEKmilkyway';
	color: red;
	font-size: 0.8rem;
`;
export const __LoginButton = styled.button`
	margin-top: 2rem;
	border: none;
	border-radius: 12px;
	color: ${CSS.WHITE};
	background-color: ${CSS.GREEN_SECONDARY};
	width: 100%;
	height: 3rem;
	font-size: 1.2rem;

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
