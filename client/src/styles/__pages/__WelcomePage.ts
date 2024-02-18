import styled from 'styled-components';
import * as CSS from '../constants';

// react-boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

export const __PageContainer = styled(Container)`
	padding: 3rem 0 0 0;
	background-color: ${CSS.BACKGROUND_PRIMARY};
	height: calc(100vh - 3rem);
`;

export const __PageRow = styled(Row)`
	padding: 8rem 0;
	height: 100%;
	margin: 0;
	justify-content: center;
`;

export const __TextCol = styled(Col)`
	display: flex;
	justify-content: center;
`;

export const __TextStack = styled(Stack)``;

export const __Title = styled.h1`
	font-size: 3rem;
	margin-bottom: 2rem;
	color: ${CSS.ACCENT_PRIMARY};
	word-break: keep-all;
`;

export const __Description = styled.p`
	font-size: 2rem;
	color: ${CSS.ACCENT_SECONDARY};
	word-break: keep-all;
`;

export const __ImageCol = styled(Col)`
	display: flex;
	justify-content: center;
`;
export const __Image = styled(Image)`
	margin-left: auto;
	width: 100%;
	height: fit-content;
`;
