import styled from 'styled-components';
import * as CSS from '../constants';

// react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export const __PageContainer = styled(Container)`
	padding: 3rem 0 0 0;
	width: 100%;
	min-height: calc(100vh - 3rem);
	background-color: white;
	display: flex;
	justify-content: center;
`;

export const __FormRow = styled(Row)`
	padding: 0;
	width: 100%;
`;
export const __FormCol = styled(Col)`
	margin: 8% 0 8% 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const __ImageCol = styled(Col)`
	margin: 8% 0 8% 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const __Image = styled(Image)`
	width: 100%;
	object-fit: contain;
	margin-bottom: auto;
`;

export const __ToggleButton = styled.button`
	margin-top: 1rem;
	border: none;
	border-radius: 12px;
	color: ${CSS.WHITE};
	background-color: ${CSS.GREEN_SECONDARY};
	width: 60%;
	height: 3rem;
	font-size: 1.2rem;

	&:hover {
		background-color: ${CSS.GREEN_PRIMARY};
	}
`;
