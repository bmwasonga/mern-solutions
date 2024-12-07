import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';

function Login() {
	const { login, isLoading, error } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		await login({
			email: data.email,
			password: data.password,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{error && <p>{error}</p>}
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
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					className='form-input'
					{...register('email')}
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
			<div className='form-group'>
				<label htmlFor='email'>Confirm Password</label>
				<input
					type='password'
					className='form-input'
					{...register('confirmPassword')}
					required
				/>
			</div>
			<button type='submit' className='button' disabled={isLoading}>
				{isLoading ? <p>Loading...</p> : 'Login'}
			</button>
		</form>
	);
}
export default Login;
