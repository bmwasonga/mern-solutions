import { useEffect } from 'react';
import { getAllActivities } from '../../features/auth/activitiesApi';
import Table from '../../layouts/MainLayout/components/Tables';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
const Activities = () => {
	const dispatch = useDispatch();
	const { activities, isLoading, error } = useSelector(
		(state) => state.activities
	);

	useEffect(() => {
		dispatch(getAllActivities());
	}, [dispatch]);

	console.log('the activities are', activities);
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
