import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { __PageWrapper } from './styles/__pages/__Global';
import { RouterProvider } from 'react-router-dom';
import Router from './router';

function App() {
	return (
		<>
			<Header />
			<__PageWrapper>
				<Outlet />
			</__PageWrapper>
			<Footer />
		</>
	);
}

export default App;
