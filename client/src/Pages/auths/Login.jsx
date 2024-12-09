import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect } from 'react';
import { useLoginMutation } from '../../features/auth/api';
function Login() {
	const { login, isLoading, error, isAuthenticated } = useAuth();
	const [loginMutation] = useLoginMutation();

	const navigate = useNavigate();
	// console.log(isAuthenticated, 'is here');
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
	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		navigate('/home');
	// 	}
	// }, [isAuthenticated, navigate]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* {error && <p>{error}</p>} */}

			<div className='form-group'>
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					className='form-input'
					{...register('username')}
					required
				/>
			</div>

			<div className='form-group'>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					className='form-input'
					{...register('password')}
					required
				/>
			</div>
			{/* <div className='form-group'>
				<label htmlFor='email'>Confirm Password</label>
				<input
					type='password'
					className='form-input'
					{...register('confirmPassword')}
					required
				/>
			</div> */}
			<button type='submit' className='button' disabled={isLoading}>
				{isLoading ? <p>Loading...</p> : 'Login'}
			</button>
		</form>
	);
}
export default Login;
