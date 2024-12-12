import { useState, useEffect } from 'react';

const FileUpload = ({ preloadedImageUrl, onUpload }) => {
	const [preview, setPreview] = useState(preloadedImageUrl || '');
	const [, setFile] = useState(null);

	useEffect(() => {
		setPreview(preloadedImageUrl || '');
	}, [preloadedImageUrl]);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			onUpload(selectedFile);
			// Create preview URL
			const objectUrl = URL.createObjectURL(selectedFile);
			setPreview(objectUrl);
		}
	};

	return (
		<div className='flex flex-col items-center gap-4 mb-4'>
			{preview && (
				<img
					src={preview}
					alt='Preview'
					className='w-32 h-32 rounded-full object-cover'
				/>
			)}
			<input
				type='file'
				onChange={handleFileChange}
				accept='image/*'
				className='hidden'
				id='file-upload'
			/>
			<label
				htmlFor='file-upload'
				className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600'>
				{preview ? 'Change Image' : 'Upload Image'}
			</label>
		</div>
	);
};

export default FileUpload;
