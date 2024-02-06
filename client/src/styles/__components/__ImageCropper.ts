import styled from 'styled-components';
import * as CSS from '../constants';

import Spinner from 'react-bootstrap/Spinner';

export const __Background = styled.div``;

export const __CropperContainer = styled.div`
	position: relative;
	width: 100%;
	height: 40vh;
	background-color: rgb(90, 90, 90, 0.6);
`;

export const __ControlsContainer = styled.div`
	/* position: absolute; */
	width: 100%;
	background-color: white;
	bottom: 0;
	padding: 2%;
`;

export const __ZoomSliderContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 4%;
`;

export const __ZoomSlider = styled.input`
	width: 50%;
`;

export const __ButtonsContainer = styled.div`
	width: 50%;
	display: flex;
	justify-content: space-evenly;
	margin: auto;
`;

export const __Button = styled.button`
	border: none;
	padding: 0.4rem;
	border-radius: 8px;
	&:hover {
		background-color: ${CSS.GREEN_SAGE};
	}
`;

export const __Spinner = styled(Spinner)`
	color: ${CSS.GREEN_SAGE};
`;
