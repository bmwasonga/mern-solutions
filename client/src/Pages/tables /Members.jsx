import { useDispatch, useSelector } from 'react-redux';
import { HiPencil, HiOutlineTrash } from 'react-icons/hi';
import Table from '../../layouts/MainLayout/components/Tables';
import FormButton from '../../components/FormButton';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { useEffect } from 'react';
import {
	getAllMembers,
	deleteMember,
	setSelectedMember,
} from '../../features/auth/membersApi';

const Members = () => {
	const dispatch = useDispatch();

	const { members, isLoading, error, selectedMember } = useSelector(
		(state) => state.members
	);

	useEffect(() => {
		dispatch(getAllMembers());
	}, [dispatch]);

	const handleSelectMember = (member) => {
		dispatch(setSelectedMember(member));
	};

	const handleCreateMember = () => {
		// Logic to create a new member
		console.log('Create member button clicked');
	};

	const handleEditMember = (id) => {
		// Logic to edit a member
		console.log(`Edit member with ID: ${id}`);
	};

	const handleDeleteMember = (id) => {
		console.log(`Delete member with ID: ${id}`);

		dispatch(deleteMember({ id }))
			.unwrap()
			.then(() => {
				dispatch(getAllMembers());
			});
	};

	const columns = [
		{ key: 'id', label: 'ID' },
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'dateOfBirth', label: 'Date of Birth' },
		{
			key: 'profilePicture',
			label: 'Profile Picture',
			render: (value) => (
				<img src={value} alt='Profile' className='w-10 h-10 rounded-full' />
			),
		},
		{ key: 'createdAt', label: 'Created At' },
		{ key: 'updatedAt', label: 'Updated At' },
		{
			key: 'actions',
			label: 'Actions',
			render: (_, row) => (
				<div className='flex space-x-2'>
					<button onClick={() => handleEditMember(row.id)}>
						<HiPencil className='h-5 w-5' />
					</button>
					<button onClick={() => handleDeleteMember(row.id)}>
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

			{selectedMember && (
				<div className='mt-4'>
					<h2>Selected Member</h2>
					<p>ID: {selectedMember.id}</p>
					<p>Name: {selectedMember.name}</p>
					<p>Email: {selectedMember.email}</p>
				</div>
			)}
		</MainLayout>
	);
};

export default Members;
