import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';

import App from './App.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/auths/Login.jsx';
import Signup from './Pages/auths/Signup.jsx';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		{/* <App /> */}

		<Routes>
			<Route path='/' element={<App />} />
			<Route path='/home' element={<Home />} />
		</Routes>
		{/* Authenticated routes should come here */}
		<Routes>
			<Route path='/auth/login' element={<Login />} />
			<Route path='/auth/signup' element={<Signup />} />
		</Routes>
	</BrowserRouter>
);
