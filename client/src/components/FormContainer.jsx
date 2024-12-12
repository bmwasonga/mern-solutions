const FormContainer = ({ children }) => {
	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8'>
				{children}
			</div>
		</div>
	);
};
export default FormContainer;
