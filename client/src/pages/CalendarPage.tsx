import { __PageContainer } from '../styles/__pages/__CalendarPage';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from '../data/constants/types/calendar';
import dayjs from 'dayjs';
import { getPosts } from '../utils/axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userPostsState, filteredUserPostsState, dateArrayFromUserPostsState } from '../utils/state';
import PostCard from '../components/PostCard';
import { post } from '../data/constants/types/post';
import { useAuth } from '../utils/hooks/useAuth';

import 'react-calendar/dist/Calendar.css';
import '../styles/customCalendar.css';
import {
	__PageRow,
	__CalendarCol,
	__PostsCol,
	__ModalButton,
	__Modal,
	__ModalHeader,
	__ModalTitle,
	__ModalBody,
	__ModalFooter,
	__ModalCloseButton,
	__PostsContainer,
	__CalendarContainer,
	__PostsRow,
	__Date,
	__NoPost,
} from '../styles/__pages/__CalendarPage';

import { __CalendarDotContainer, __CalendarDot } from '../styles/__components/__Calendar';
import PostForm from '../components/PostForm';

export default function CalendarPage() {
	const isLoggedIn = useAuth();

	const [postsState, setPostsState] = useRecoilState(userPostsState);
	const [calendarDate, setCalendarDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
	const sortedPosts = useRecoilValue(filteredUserPostsState(calendarDate));
	const datesToMark = useRecoilValue(dateArrayFromUserPostsState);

	const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setCalendarDate(dayjs(value?.toString()).format('YYYY-MM-DD').toString());
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		const { result, message, data } = await getPosts();
		if (result) {
			setPostsState(data);
		}
	};

	const [modalShow, setModalShow] = useState(false);

	const handleModalClose = () => setModalShow(false);
	const handleModalShow = () => setModalShow(true);

	if (!isLoggedIn) {
		return null;
	}

	return (
		<__PageContainer fluid={'md'}>
			<__PageRow>
				<__CalendarCol xs={12} md={5}>
					<__CalendarContainer fluid={'md'}>
						<Calendar
							onChange={handleDateChange}
							value={calendarDate}
							minDate={new Date(2020, 0, 1)}
							maxDate={new Date()}
							minDetail={'year'}
							tileContent={({ date }) => {
								if (datesToMark.includes(dayjs(date).format('YYYY-MM-DD'))) {
									return (
										<__CalendarDotContainer>
											<__CalendarDot />
										</__CalendarDotContainer>
									);
								}
							}}
						/>
						<__ModalButton type='button' onClick={handleModalShow}>
							작성하기
						</__ModalButton>
					</__CalendarContainer>
					<__Modal show={modalShow} onHide={handleModalClose} size={'lg'} dialogClassName='custom-modal'>
						<__ModalHeader>
							<__ModalTitle>{calendarDate}</__ModalTitle>
							<__ModalCloseButton onClick={handleModalClose} />
						</__ModalHeader>
						<__ModalBody>
							<PostForm selectedDate={calendarDate} handleModalClose={handleModalClose}></PostForm>
						</__ModalBody>
					</__Modal>
				</__CalendarCol>
				<__PostsCol>
					<__PostsContainer fluid={'md'}>
						<__Date>{calendarDate}</__Date>
						<__PostsRow xs={2} sm={2} md={2} lg={3} xl={4} className={'g-4'}>
							{sortedPosts.length > 0 &&
								sortedPosts.map((post: post) => {
									return <PostCard key={post.id} post={post} />;
								})}
							{sortedPosts.length == 0 && <__NoPost>게시글이 없습니다.</__NoPost>}
						</__PostsRow>
					</__PostsContainer>
				</__PostsCol>
			</__PageRow>
		</__PageContainer>
	);
}
