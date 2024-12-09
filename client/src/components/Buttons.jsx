import React from 'react';

const FormButton = ({
	children,
	type = 'button',
	variant = 'primary',
	isLoading = false,
	disabled = false,
	fullWidth = false,
	onClick,
	className = '',
}) => {
	const baseStyles =
		'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

	const variants = {
		primary:
			'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
		secondary:
			'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100',
		danger:
			'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
		success:
			'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:bg-green-400',
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || isLoading}
			className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'cursor-not-allowed opacity-60' : ''}
        ${className}
      `}>
			{isLoading ? (
				<>
					<svg
						className='w-4 h-4 mr-2 animate-spin'
						fill='none'
						viewBox='0 0 24 24'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						/>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						/>
					</svg>
					Processing...
				</>
			) : (
				children
			)}
		</button>
	);
};

export default FormButton;
