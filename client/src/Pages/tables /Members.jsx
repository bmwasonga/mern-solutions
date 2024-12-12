import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { HiPencil, HiOutlineTrash, HiX } from 'react-icons/hi';
import Table from '../../layouts/MainLayout/components/Tables';
import FormButton from '../../components/FormButton';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import {
	getAllMembers,
	deleteMember,
	setSelectedMember,
	updateMember,
	createMember,
} from '../../features/auth/membersApi';
import Modal from '../../components/Modal';
import { useForm } from 'react-hook-form';
import FileUpload from '../../components/FileUpload';

const Members = () => {
	const dispatch = useDispatch();
	const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
	const { register, handleSubmit, reset, setValue } = useForm();
	const { members, isLoading, error, selectedMember } = useSelector(
		(state) => state.members
	);

	useEffect(() => {
		dispatch(getAllMembers());
	}, [dispatch]);

	useEffect(() => {
		if (selectedMember?.profilePicture) {
			const fullUrl = selectedMember.profilePicture.startsWith('http')
				? selectedMember.profilePicture
				: `${serverUrl}/${selectedMember.profilePicture}`;
			setCurrentProfilePicture(fullUrl);
		} else {
			setCurrentProfilePicture(null);
		}
	}, [selectedMember, serverUrl]);

	const handleSelectMember = (member) => {
		dispatch(setSelectedMember(member));
	};

	const handleCreateMember = () => {
		setIsModalOpen(true);
		setIsEditing(false);
		setCurrentProfilePicture(null);
		reset();
		dispatch(setSelectedMember(null));
	};

	const handleEditMember = (id) => {
		setIsModalOpen(true);
		setIsEditing(true);
		const member = members.find((member) => member.id === id);
		if (member) {
			dispatch(setSelectedMember(member));
			setValue('name', member.name);
			setValue('email', member.email);
			setValue('dateOfBirth', member.dateOfBirth);
			if (member.profilePicture) {
				const fullUrl = member.profilePicture.startsWith('http')
					? member.profilePicture
					: `${serverUrl}/${member.profilePicture}`;
				setCurrentProfilePicture(fullUrl);
			}
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setIsEditing(false);
		setCurrentProfilePicture(null);
		reset();
		dispatch(setSelectedMember(null));
	};

	const handleDeleteMember = (id) => {
		dispatch(deleteMember({ id }))
			.unwrap()
			.then(() => {
				dispatch(getAllMembers());
			});
	};

	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('email', data.email);
		formData.append('dateOfBirth', data.dateOfBirth);
		if (data.profilePicture) {
			formData.append('profilePicture', data.profilePicture);
		}

		if (isEditing && selectedMember) {
			dispatch(updateMember({ id: selectedMember.id, formData }))
				.unwrap()
				.then(() => {
					dispatch(getAllMembers());
					handleCloseModal();
				})
				.catch(() => {
					alert('Failed to update member');
				});
		} else {
			dispatch(createMember(formData))
				.unwrap()
				.then(() => {
					dispatch(getAllMembers());
					handleCloseModal();
				})
				.catch(() => {
					alert('Failed to create member');
				});
		}
	};

	const columns = [
		{ key: 'id', label: 'ID' },
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'dateOfBirth', label: 'Date of Birth' },
		{
			key: 'profilePicture',
			label: 'Profile Picture',
			render: (value) => {
				const imageUrl = value?.startsWith('http')
					? value
					: `${serverUrl}/${value}`;
				return (
					<img
						src={imageUrl}
						alt='Profile'
						className='w-10 h-10 rounded-full object-cover'
					/>
				);
			},
		},
		{
			key: 'createdAt',
			label: 'Created At',
			render: (value) => new Date(value).toLocaleString(),
		},
		{
			key: 'updatedAt',
			label: 'Updated At',
			render: (value) => new Date(value).toLocaleString(),
		},
		{
			key: 'actions',
			label: 'Actions',
			render: (_, row) => (
				<div className='flex space-x-2'>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleEditMember(row.id);
						}}>
						<HiPencil className='h-5 w-5' />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							handleDeleteMember(row.id);
						}}>
						<HiOutlineTrash className='h-5 w-5 text-red-500' />
					</button>
				</div>
			),
		},
	];

	return (
		<MainLayout>
			<h1>Members table</h1>
			<FormButton onClick={handleCreateMember} variant='primary'>
				Create Member
			</FormButton>
			{isLoading && !error && <p>Loading...</p>}
			<Table
				isLoading={isLoading}
				data={members}
				columns={columns}
				itemsPerPage={5}
				searchable
				sortable
				onRowClick={handleSelectMember}
			/>
			<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
				<div className='flex items-center justify-between'>
					<h2>{isEditing ? 'Edit Member' : 'Create Member'}</h2>
					<button onClick={handleCloseModal}>
						<HiX className='h-5 w-5' />
					</button>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FileUpload
						preloadedImageUrl={currentProfilePicture}
						onUpload={(file) => setValue('profilePicture', file)}
					/>
					<div>
						<label>Name</label>
						<input {...register('name')} className='border p-2 w-full' />
					</div>
					<div>
						<label>Email</label>
						<input {...register('email')} className='border p-2 w-full' />
					</div>
					<div>
						<label>Date of Birth</label>
						<input
							type='date'
							{...register('dateOfBirth')}
							className='border p-2 w-full'
						/>
					</div>
					<FormButton type='submit' variant='primary'>
						{isEditing ? 'Save' : 'Create'}
					</FormButton>
				</form>
			</Modal>
		</MainLayout>
	);
};

export default Members;
