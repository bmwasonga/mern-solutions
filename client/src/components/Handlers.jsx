export const Loading = () => {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900'></div>
		</div>
	);
};

export const Error = ({ message = 'Something went wrong' }) => {
	return (
		<div className='flex items-center justify-center '>
			<p className='text-red-500 text-lg'>{message}</p>
		</div>
	);
};
