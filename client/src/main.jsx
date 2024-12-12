import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import './index.css';
import Login from './Pages/auths/Login.jsx';
import Resgister from './Pages/auths/Register.jsx';

import { store } from '../store/store';
import { Provider } from 'react-redux';
import ProtectedRoute from './features/ProtectedRoute.jsx';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import Members from './Pages/tables /Members.jsx';
import Activities from './Pages/tables /Activities.jsx';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Resgister />} />
				<Route element={<ProtectedRoute />}>
					<Route path='/' element={<MainLayout />} />
					<Route path='/members' element={<Members />} />
					<Route path='/activities' element={<Activities />} />
				</Route>
				{/* Catch all route for non-existent pages */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
