import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import WelcomePage from '../pages/WelcomePage';
import SigninPage from '../pages/SigninPage';
import MyPage from '../pages/MyPage';
import CalendarPage from '../pages/CalendarPage';
import RedirectionPage from '../pages/RedirectionPage';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <WelcomePage />,
			},
			{
				path: 'calendar',
				element: <CalendarPage />,
			},
			{
				path: 'mypage',
				element: <MyPage />,
			},
			{
				path: 'signin',
				element: <SigninPage />,
			},
		],
		errorElement: <RedirectionPage />,
	},
]);

export default Router;
