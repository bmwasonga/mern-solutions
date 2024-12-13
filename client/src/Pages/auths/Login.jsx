import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useLoginMutation } from '../../features/auth/api';
import FormContainer from '../../components/FormContainer';
import { Error, Loading } from '../../components/Handlers';
function Login() {
	const [loginMutation, { isError, isSuccess, isLoading, error }] =
		useLoginMutation();

	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		await loginMutation({
			username: data.username,
			password: data.password,
		});
	};
	useEffect(() => {
		if (isSuccess) {
			navigate('/members');
		}
	}, [isSuccess, navigate]);
	return (
		<FormContainer>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* {isError && <p>{error.message}</p>} */}
				{isError && (
					<Error
						message={
							error.data
								? JSON.stringify(error.data.message)
								: 'An error occurred'
						}></Error>
				)}
				<h1>Login</h1>
				<div className='relative mt-10'>
					<label
						htmlFor='username'
						className='peer-focus:text-primary absolute left-3 -top-4 bg-white px-2 text-sm capitalize text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base  peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm'>
						Username
					</label>
					<input
						type='text'
						className='peer focus:border-primary focus:ring-primary h-10 w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1'
						{...register('username')}
						required
					/>
					{errors.username && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.username.message}
						</p>
					)}
				</div>
				<div className='relative mt-10'>
					<label
						htmlFor='password'
						className='peer-focus:text-primary absolute left-3 -top-4 bg-white px-2 text-sm capitalize text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base  peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm'>
						Password
					</label>
					<input
						type='password'
						className='peer focus:border-primary focus:ring-primary h-10 w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1'
						{...register('password')}
						required
					/>
					{errors.password && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.password.message}
						</p>
					)}
				</div>
				<div className='relative mt-10'>
					<label
						htmlFor='confirmPassword'
						className='peer-focus:text-primary absolute left-3 -top-4 bg-white px-2 text-sm capitalize text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base  peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm'>
						Confirm Password
					</label>
					<input
						type='password'
						className='peer focus:border-primary focus:ring-primary h-10 w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1'
						{...register('confirmPassword')}
						required
					/>
					{errors.confirmPassword && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.confirmPassword.message}
						</p>
					)}
				</div>
				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2'
					disabled={isLoading}>
					{isLoading ? <Loading /> : 'Login'}
				</button>
			</form>

			<p className='text-center mt-4'>
				Don&apos;t have an account?
				<a href='/register' className='text-blue-600 hover:underline'>
					Register here
				</a>
			</p>
		</FormContainer>
	);
}
export default Login;
