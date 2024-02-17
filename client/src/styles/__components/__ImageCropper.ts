import styled from 'styled-components';
import * as CSS from '../constants';

import Spinner from 'react-bootstrap/Spinner';

export const __Background = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
`;

export const __CropperContainer = styled.div`
	position: relative;
	width: 100%;
	height: 80vh;
	max-height: 60vh;
	background-color: rgb(90, 90, 90, 0.6);
`;

export const __ControlsContainer = styled.div`
	width: 100%;
	background-color: white;
	bottom: 0;
	padding: 4% 0;
	justify-self: end;
`;

export const __ZoomSliderContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 4%;
`;

export const __ZoomSlider = styled.input`
	width: 80%;
	max-width: 20rem;
`;

export const __ButtonsContainer = styled.div`
	width: 80%;
	max-width: 16rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: auto;
	height: 6rem;
`;

export const __Button = styled.button`
	font-size: 1rem;
	width: 100%;
	margin: 0 0.6rem;
	height: 3rem;
	border: none;
	padding: 0.2rem;
	border-radius: 8px;
	background-color: ${CSS.ACCENT_PRIMARY};
	color: ${CSS.BACKGROUND_PRIMARY};
	font-weight: 600;
	&:hover {
		background-color: ${CSS.ACCENT_SECONDARY};
	}
`;

export const __Spinner = styled(Spinner)`
	min-width: 2rem;
	min-height: 2rem;
	color: ${CSS.ACCENT_SECONDARY};
`;
