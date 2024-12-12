import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useRegisterMutation } from '../../features/auth/api';
import FormContainer from '../../components/FormContainer';

function Register() {
	const [signup, { isError, isSuccess, isLoading, error }] =
		useRegisterMutation();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		await signup({
			username: data.username,
			email: data.email,
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
			<h1>Register</h1>
			{isError && (
				<p className='text-red-500 text-sm mt-1'>
					{error.data
						? JSON.stringify(error.data.message)
						: 'An error occurred'}
				</p>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				{error && <p>{error}</p>}
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
						htmlFor='email'
						className='peer-focus:text-primary absolute left-3 -top-4 bg-white px-2 text-sm capitalize text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base  peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm'>
						Email
					</label>
					<input
						type='email'
						className='peer focus:border-primary focus:ring-primary h-10 w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1'
						{...register('email')}
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
						password
					</label>
					<input
						type='text'
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
						htmlFor='password'
						className='peer-focus:text-primary absolute left-3 -top-4 bg-white px-2 text-sm capitalize text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base  peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm'>
						confirm password
					</label>
					<input
						type='text'
						className='peer focus:border-primary focus:ring-primary h-10 w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1'
						{...register('confirm-password')}
						required
					/>
					{errors.password && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.password.message}
						</p>
					)}
				</div>
				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2'
					disabled={isLoading}>
					{isLoading ? <p>Loading...</p> : 'Login'}
				</button>

				<p className='mt-5 text-center'>
					Already have an account?{' '}
					<Link to='/login' className='text-blue-500'>
						Login
					</Link>
				</p>
			</form>
		</FormContainer>
	);
}
export default Register;
