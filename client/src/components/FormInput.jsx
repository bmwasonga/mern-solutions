// import { useEffect } from 'react';

// export const FormInput = ({ label, type, name, inputRef, ...rest }) => {
// 	useEffect(() => {
// 		if (inputRef && typeof inputRef === 'object' && inputRef.current) {
// 			inputRef.current = document.getElementById(name);
// 		}
// 	}, [inputRef, name]);

// 	return (
// 		<div className='relative mt-10'>
// 			<input
// 				id={name}
// 				type={type}
// 				name={name}
// 				className='peer focus:border-primary focus:ring-primary h-10 w-full rounded-lg border border-gray-300 px-4 text-gray-900 placeholder-transparent focus:outline-none focus:ring-1'
// 				placeholder='Password'
// 				ref={inputRef}
// 				{...rest}
// 			/>
// 			<label
// 				htmlFor={name}
// 				className='peer-focus:text-primary absolute left-3 -top-4 bg-white px-2 text-sm capitalize text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base  peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm'>
// 				{label}
// 			</label>
// 		</div>
// 	);
// };
