import { useGetAllMembersQuery } from '../../features/auth/api';
import Table from '../../layouts/MainLayout/components/Tables';
import MainLayout from '../../layouts/MainLayout/MainLayout';
const Members = () => {
	const {
		data: members,
		isLoading,
		error,
		token,
	} = useGetAllMembersQuery(token);

	console.log('the members are', members);
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
	];

	{
		isLoading && !error && <p>Loading...</p>;
	}
	return (
		<MainLayout>
			<h1>Members table</h1>
			<Table
				isLoading={isLoading}
				data={members}
				columns={columns}
				itemsPerPage={5}
				searchable
				sortable
			/>
		</MainLayout>
	);
};
export default Members;
