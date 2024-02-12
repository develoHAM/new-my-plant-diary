import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';

import * as CSS from '../constants';

export const __Navbar = styled(Navbar)`
	background-color: ${CSS.GREEN_SAGE};
	min-height: 3rem;
	max-height: 3rem;
	height: 3rem;
	width: 100vw;
`;

export const __Container = styled(Container)`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
`;

export const __NavbarBrand = styled(Navbar.Brand)`
	text-decoration: none;
	font-size: 1.2rem;
	font-weight: 900;
	color: ${CSS.LOGO};
`;

export const __Nav = styled(Nav)`
	margin-left: auto;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-direction: row;
	width: 40%;
`;

export const __NavLink = styled(Nav.Link)`
	margin: 0 0.4rem;
	font-size: 1rem;
	color: ${CSS.WHITE};
	text-decoration: none;
	&.active {
		color: ${CSS.GREEN_PRIMARY};
		text-decoration: underline;
	}
`;

export const __NavbarToggle = styled(Navbar.Toggle)`
	font-size: 1rem;

	&:active {
		outline: none;
	}
`;
export const __NavbarCollapse = styled(Navbar.Collapse)``;

export const __NavbarOffcanvas = styled(Navbar.Offcanvas)`
	max-width: 200px;
`;
export const __OffcanvasHeader = styled(Offcanvas.Header)``;
export const __OffcanvasTitle = styled(Offcanvas.Title)``;
export const __OffcanvasBody = styled(Offcanvas.Body)``;
