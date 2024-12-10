import { useEffect } from 'react';
import { useGetAllActivitiesQuery } from '../../features/auth/activitiesApi';
import Table from '../../layouts/MainLayout/components/Tables';
import MainLayout from '../../layouts/MainLayout/MainLayout';
const Activities = () => {
	const { data: activities, isLoading, error } = useGetAllActivitiesQuery();

	useEffect(() => {
		// Set a timeout to update the state after 3 seconds
		const timer = setTimeout(() => {
			console.log(activities);
		}, 3000);

		// Cleanup function to clear the timeout if the component unmounts
		return () => clearTimeout(timer);
	}, [activities]); // Empty dependency array ensures this runs only on mount
	const columns = [
		{ key: 'id', label: 'ID' },
		{ key: 'actionType', label: 'actionType' },
		{ key: 'details', label: 'details' },
		{ key: 'userId', label: 'User Id' },

		{ key: 'createdAt', label: 'Created At' },
		{ key: 'updatedAt', label: 'Updated At' },
	];

	return (
		<MainLayout>
			<h1>Activities table</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			<Table
				isLoading={isLoading}
				data={activities}
				columns={columns}
				itemsPerPage={9}
				searchable
				sortable
			/>
		</MainLayout>
	);
};
export default Activities;
