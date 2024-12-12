import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

const FileUpload = () => {
	const [image, setImage] = useState(null);
	const fileInputRef = useRef(null);

	console.log(image);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith('image/')) {
			setImage(file);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith('image/')) {
			setImage(file);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	return (
		<div className='w-full max-w-md mx-auto p-4'>
			<div
				className='border-2 border-dashed rounded-lg p-4 text-center'
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onClick={() => fileInputRef.current?.click()}>
				{image ? (
					<>
						<img
							src={URL.createObjectURL(image)}
							alt='Preview'
							className='h-32 w-32 object-cover rounded-full object-center'
						/>
						<h1>Image will be displayed like</h1>
					</>
				) : (
					<div className='py-8'>
						<Upload className='mx-auto h-12 w-12 text-gray-400' />
						<p className='mt-2 text-sm text-gray-500'>
							Drop an image here or click to upload
						</p>
					</div>
				)}
				<input
					ref={fileInputRef}
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					className='hidden'
				/>
			</div>
		</div>
	);
};

export default FileUpload;
