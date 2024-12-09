const Header = ({ data }) => {
	if (!data) {
		return null;
	}
	const { username, email } = data.user;

	return (
		<header className='bg-white shadow fixed top-0 w-full z-10'>
			<nav className='mx-auto px-4 sm:px-6 lg:px-8'>
				<h3>Welcome to user Manager</h3>
				<div className='flex items-center justify-between h-16'>
					<span>{username}</span>
					<span>{email}</span>
				</div>
				<button type='button'>Logout</button>
			</nav>
		</header>
	);
};

export default Header;
