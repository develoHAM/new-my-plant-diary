import styled from 'styled-components';
import * as CSS from '../constants';

// react-bootstrap
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

// react-icons
import { MdEmail } from 'react-icons/md'; //email
import { FaGithub } from 'react-icons/fa'; //github
import { RiNotionFill } from 'react-icons/ri'; //notion
import { GiClassicalKnowledge } from 'react-icons/gi'; //blog

// common styling

export const __Container = styled(Container)`
	min-width: 100%;
	height: 3rem;
	margin: 0;
	padding: 0;
	background-color: ${CSS.GREEN_SAGE};
	display: flex;
	justify-content: center;
`;

export const __Stack = styled(Stack)``;

export const __InfoContainer = styled.div`
	font-size: 0.8rem;
	display: flex;
`;

export const __EmailIcon = styled(MdEmail)`
	font-size: 1.8rem;
	color: ${CSS.GREEN_PRIMARY};
`;
export const __GitHubIcon = styled(FaGithub)`
	font-size: 1.8rem;
	color: ${CSS.GREEN_PRIMARY};
`;
export const __NotionIcon = styled(RiNotionFill)`
	font-size: 1.8rem;
	color: ${CSS.GREEN_PRIMARY};
`;
export const __StudyBlogIcon = styled(GiClassicalKnowledge)`
	font-size: 1.8rem;
	color: ${CSS.GREEN_PRIMARY};
`;

export const __DesignEvoLink = styled.a`
	margin-left: 0.2rem;
	text-decoration: none;
	color: ${CSS.GREEN_PRIMARY};
`;
