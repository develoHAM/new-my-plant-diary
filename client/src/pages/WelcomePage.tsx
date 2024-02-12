import WelcomePageImage from '../data/images/2.jpg';
import {
	__PageContainer,
	__PageRow,
	__TextCol,
	__ImageCol,
	__Image,
	__TextStack,
	__Title,
	__Description,
} from '../styles/__pages/__WelcomePage';
import { __PageWrapper } from '../styles/__pages/__Global';
import { useAuth } from '../utils/hooks/useAuth';

export default function WelcomePage() {
	return (
		<>
			<__PageContainer id='MainPage __PageContainer' fluid={'md'}>
				<__PageRow xs={1} md={2} fluid={'md'}>
					<__TextCol>
						<__TextStack>
							<__Title>My Plant Diary</__Title>
							<__Description> 로그인후 반려 식물들의 성장을 매일 기록해 보세요.</__Description>
						</__TextStack>
					</__TextCol>
					<__ImageCol>
						<__Image src={WelcomePageImage} fluid rounded />
					</__ImageCol>
				</__PageRow>
			</__PageContainer>
		</>
	);
}
