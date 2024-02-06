import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import * as CSS from '../constants';

export const __Navbar = styled(Navbar)`
	background-color: ${CSS.GREEN_SAGE};
	height: 3rem;
`;

export const __Container = styled(Container)``;

export const __NavbarBrand = styled(Navbar.Brand)``;

export const __Nav = styled(Nav)``;

export const __NavLink = styled(Nav.Link)`
	margin: 0 1rem 0 1rem;
	font-size: 1.2rem;
	color: ${CSS.WHITE};
	text-decoration: none;

	&.active {
		color: ${CSS.GREEN_PRIMARY};
	}
`;

export const __BrandTitle = styled.h1`
	font-size: 1.4rem;
	margin: 0 0.4rem;
	padding: 0;
`;
