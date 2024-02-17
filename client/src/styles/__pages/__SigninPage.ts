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
	overflow-y: auto;
	background-color: ${CSS.BACKGROUND_PRIMARY};
	display: flex;
	justify-content: center;
`;

export const __FormRow = styled(Row)`
	padding: 0;
	width: 100%;
`;
export const __FormCol = styled(Col)`
	margin: 10% 0;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
`;

export const __ImageCol = styled(Col)`
	margin: 10% 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const __Image = styled(Image)`
	width: 100%;
	object-fit: contain;
`;

export const __ToggleButton = styled.div`
	margin: 1rem auto;
	color: ${CSS.ACCENT_SECONDARY};
	font-size: 1rem;
	font-weight: 400;
	width: fit-content;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}
`;
