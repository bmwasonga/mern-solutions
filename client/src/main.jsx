import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';

import App from './App.jsx';
import Login from './Pages/auths/Login.jsx';
import Resgister from './Pages/auths/Register.jsx';

import { store } from '../store/store';
import { Provider } from 'react-redux';
import ProtectedRoute from './features/ProtectedRoute.jsx';
import Home from './Pages/Home.jsx';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import Members from './Pages/tables /Members.jsx';
import Activities from './Pages/tables /Activities.jsx';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/auth/login' element={<Login />} />
				<Route path='/auth/register' element={<Resgister />} />
				<Route element={<ProtectedRoute />}>
					<Route path='/home' element={<Home />} />
					<Route path='/test' element={<MainLayout />} />
					<Route path='/members' element={<Members />} />
					<Route path='/activities' element={<Activities />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</Provider>
);
