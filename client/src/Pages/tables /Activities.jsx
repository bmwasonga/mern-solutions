import { useGetAllActivitiesQuery } from '../../features/auth/api';
import Table from '../../layouts/MainLayout/components/Tables';
import MainLayout from '../../layouts/MainLayout/MainLayout';
const Activities = () => {
	const { data: activities, isLoading, error } = useGetAllActivitiesQuery();

	console.log('the members are', activities);
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

	return (
		<MainLayout>
			<h1>Members table</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{/* <Table
				isLoading={isLoading}
				data={activities}
				columns={columns}
				itemsPerPage={5}
				searchable
				sortable
			/> */}
		</MainLayout>
	);
};
export default Activities;
