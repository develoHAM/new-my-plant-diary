import { useState } from 'react';

import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import img from '../data/images/4.jpg';

import {
	__PageContainer,
	__FormRow,
	__FormCol,
	__ImageCol,
	__Image,
	__ToggleButton,
} from '../styles/__pages/__SigninPage';

export default function SigninPage() {
	const [isLoggingIn, setIsLoggingIn] = useState(true);

	return (
		<__PageContainer id='SigninPage __PageContainer' fluid={'md'}>
			<__FormRow xs={1} lg={2} fluid={'md'}>
				<__FormCol>
					{isLoggingIn ? <LoginForm /> : <SignupForm />}
					<__ToggleButton onClick={() => setIsLoggingIn(!isLoggingIn)}>
						{isLoggingIn ? '회원가입' : '로그인'}
					</__ToggleButton>
				</__FormCol>
				<__ImageCol>
					<__Image src={img} />
				</__ImageCol>
			</__FormRow>
		</__PageContainer>
	);
}
