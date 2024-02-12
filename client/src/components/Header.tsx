import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../utils/hooks/useAuth';
import {
	__Navbar,
	__Container,
	__NavbarBrand,
	__Nav,
	__NavLink,
	__NavbarToggle,
	__NavbarCollapse,
	__NavbarOffcanvas,
	__OffcanvasHeader,
	__OffcanvasTitle,
	__OffcanvasBody,
} from '../styles/__components/__Header';
import { OffcanvasTitle } from 'react-bootstrap';

export default function Header() {
	const isLoggedIn = useAuth();

	return (
		<__Navbar fixed='top' expand='sm'>
			<__Container fluid={'md'}>
				<__NavbarBrand as={NavLink} to={'/'}>
					My Plant Diary
				</__NavbarBrand>

				<__Nav>
					{isLoggedIn ? (
						<>
							<__NavLink as={NavLink} to={'/calendar'}>
								POSTS
							</__NavLink>
							<__NavLink as={NavLink} to={'/mypage'}>
								MY PAGE
							</__NavLink>
						</>
					) : (
						<>
							<__NavLink as={NavLink} to={'/signin'}>
								LOGIN
							</__NavLink>
						</>
					)}
				</__Nav>
			</__Container>
		</__Navbar>
	);
}

{
	/* <__Nav>
						{isLoggedIn ? (
							<>
								<__NavLink as={NavLink} to={'/calendar'}>
									POSTS
								</__NavLink>
								<__NavLink as={NavLink} to={'/mypage'}>
									MY PAGE
								</__NavLink>
							</>
						) : (
							<>
								<__NavLink as={NavLink} to={'/signin'}>
									LOGIN
								</__NavLink>
							</>
						)}
					</__Nav> */
}
