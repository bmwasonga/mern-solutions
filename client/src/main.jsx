import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';

import App from './App.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/auths/Login.jsx';
import Resgister from './Pages/auths/Register.jsx';

import { store } from '../store/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			{/* <App /> */}

			{/* <Routes>
				<Route path='/' element={<App />} />
				<Route path='/home' element={<Home />} />
			</Routes> */}
			{/* Authenticated routes should come here */}
			<Routes>
				<Route path='/auth/login' element={<Login />} />
				<Route path='/auth/register' element={<Resgister />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
