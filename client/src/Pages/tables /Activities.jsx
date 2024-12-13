import { useEffect } from 'react';
import { getAllActivities } from '../../features/auth/activitiesApi';
import Table from '../../layouts/MainLayout/components/Tables';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loading } from '../../components/Handlers';
const Activities = () => {
	const dispatch = useDispatch();
	const { activities, isLoading, error } = useSelector(
		(state) => state.activities
	);
	console.log(activities);
	useEffect(() => {
		dispatch(getAllActivities());
	}, [dispatch]);

	console.log(activities.User?.email);
	const columns = [
		{ key: 'id', label: 'ID' },
		{ key: 'actionType', label: 'actionType' },
		{ key: 'details', label: 'details' },
		{ key: 'userId', label: 'User Id' },
		{
			key: 'createdAt',
			label: 'Created At',
			render: (value) => new Date(value).toLocaleString(),
		},
	];

	return (
		<MainLayout>
			<h1>Activities table</h1>
			{isLoading && <Loading />}
			{error && <Error message={error} />}
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
