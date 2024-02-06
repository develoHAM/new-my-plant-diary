import { Link } from 'react-router-dom';
import {
	__Container,
	__Stack,
	__InfoContainer,
	__EmailIcon,
	__GitHubIcon,
	__NotionIcon,
	__StudyBlogIcon,
	__DesignEvoLink,
} from '../styles/__components/__Footer';

export default function Footer() {
	return (
		<__Container>
			<__Stack direction='horizontal' gap={5}>
				<__InfoContainer>
					<a href='mailto:kdw980722@gmail.com'>
						<__EmailIcon></__EmailIcon>
					</a>
				</__InfoContainer>
				<__InfoContainer>
					<a href='https://github.com/develoHAM' target='_blank'>
						<__GitHubIcon></__GitHubIcon>
					</a>
				</__InfoContainer>
				<__InfoContainer>
					<a href='https://develoham.notion.site/266e48e854f44bd59cf42fdac25f62cd?pvs=4' target='_blank'>
						<__NotionIcon></__NotionIcon>
					</a>
				</__InfoContainer>
				<__InfoContainer>
					<a href='https://hamhamcoding.tistory.com' target='_blank'>
						<__StudyBlogIcon></__StudyBlogIcon>
					</a>
				</__InfoContainer>
			</__Stack>
		</__Container>
	);
}
