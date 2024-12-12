import { useDispatch } from 'react-redux';
import FormButton from '../components/FormButton';
import { logout } from '../features/authSlice';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { useNavigate } from 'react-router';

const Settings = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());

		navigate('/login');
	};

	return (
		<MainLayout>
			<div className='flex justify-center items-center min-h-screen'>
				<div className='text-center'>
					<h1>Here is a big fat juicy logout button</h1>
					<FormButton variant={'danger'} onClick={handleLogout}>
						Logout
					</FormButton>
				</div>
			</div>
		</MainLayout>
	);
};
export default Settings;
