import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectionPage() {
	const navigate = useNavigate();
	const [timer, setTimer] = useState(5);

	useEffect(() => {
		const timerInterval = setInterval(() => {
			setTimer((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(timerInterval);
	}, []);

	useEffect(() => {
		if (timer == 0) {
			navigate('/');
		}
	}, [timer, navigate]);

	return <div>404 PAGE NOT FOUND! Redirecting to home in {timer} seconds</div>;
}
