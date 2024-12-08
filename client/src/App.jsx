import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refetchUser } from './features/authSlice';

function App() {
	// const token = localStorage.getItem('token');
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (token) {
	// 		dispatch(refetchUser());
	// 	}
	// }, [token, dispatch]);

	return (
		<div className='h-screen bg-slate-600 '>
			<h1>this is the begining page</h1>
		</div>
	);
}
export default App;
