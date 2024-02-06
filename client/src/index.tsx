import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './router';
import { RecoilRoot } from 'recoil';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<RouterProvider router={Router} />
		</RecoilRoot>
	</React.StrictMode>
);
