import { HiOutlineX } from 'react-icons/hi';
import { logout } from '../../../features/authSlice';

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
	const navItems = [
		{ name: 'Dashboard', icon: '🏠' },
		{ name: 'Analytics', icon: '📊' },
		{ name: 'Users', icon: '👥' },
		{ name: 'Messages', icon: '✉️' },
		{ name: 'Settings', icon: '⚙️' },
	];

	return (
		<aside
			className={`
		fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
		md:translate-x-0 md:static md:h-screen
		${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
	`}>
			<div className='flex items-center justify-between p-4 border-b'>
				<span className='font-bold text-xl'>You, The people</span>
				<button
					className='md:hidden p-1 cursor-pointer'
					onClick={toggleSidebar}>
					<HiOutlineX className='h-6 w-6' />
				</button>
			</div>

			<nav className='p-4'>
				<ul className='space-y-2'>
					{navItems.map((item) => (
						<li key={item.name}>
							<a
								href='#'
								className='flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors'>
								<span className='text-xl'>{item.icon}</span>
								<span>{item.name}</span>
							</a>
						</li>
					))}
				</ul>
			</nav>

			<button type='submit' onClick={() => logout}>
				Logout{' '}
			</button>
		</aside>
	);
};

export default Sidebar;
