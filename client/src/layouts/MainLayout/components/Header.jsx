import { HiOutlineViewList } from 'react-icons/hi';

const Header = ({ data, toggleSidebar, isSidebarOpen }) => {
	if (!data) {
		return null;
	}
	const { username, email } = data.user;

	return (
		<>
			<nav className='md:hidden bg-white shadow-md fixed w-full top-0 z-50'>
				<div className='flex items-center justify-between p-4'>
					<div className=''></div>
					<button onClick={toggleSidebar} className='p-1 cursor-pointer'>
						<HiOutlineViewList className='h-6 w-6' />
					</button>
					<span className='font-semibold text-lg'>Dashboard</span>
					<div className='w-6' /> {/* Spacer for alignment */}
					<span>{username}</span>
					<span>{email}</span>
				</div>
			</nav>

			{/* Mobile Sidebar Overlay */}
			{isSidebarOpen && (
				<div
					className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
					onClick={toggleSidebar}
				/>
			)}
		</>
	);
};

export default Header;

// <header className='bg-white shadow fixed top-0 w-full z-10'>
// 	<nav className='mx-auto px-4 sm:px-6 lg:px-8'>
// 		<h3>Welcome to user Manager</h3>
// 		<div className='flex items-center justify-between h-16'>
// 			<span>{username}</span>
// 			<span>{email}</span>
// 		</div>
// 		<button type='button'>Logout</button>
// 	</nav>
// </header>
