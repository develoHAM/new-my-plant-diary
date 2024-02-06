import { Link, NavLink } from 'react-router-dom';
import { loginState } from '../utils/state';
import { useRecoilState } from 'recoil';
import { useAuth } from '../utils/hooks/useAuth';
import { __Navbar, __Container, __NavbarBrand, __Nav, __NavLink, __BrandTitle } from '../styles/__components/__Header';

export default function Header() {
	const isLoggedIn = useAuth();

	return (
		<>
			<__Navbar fixed='top'>
				<__Container fluid={'md'}>
					<__NavbarBrand>
						<__NavLink as={Link} to={'/'}>
							<__BrandTitle>My Plant Diary</__BrandTitle>
						</__NavLink>
					</__NavbarBrand>
					<__Nav className='ms-auto'>
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
		</>
	);
}
