import { styled } from 'styled-components';
export const __CalendarDotContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;
export const __CalendarDot = styled.div`
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background-color: red;
	position: absolute;
	top: 0;
	left: 50%;
	transform: translate(-50%, 6%);
`;
