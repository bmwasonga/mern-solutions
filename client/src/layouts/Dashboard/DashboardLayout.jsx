import DashboardHeader from './components/DashboardHeader';
import DashboardSidebar from './components/DashboardSidebar';

const DashboardLayout = ({ children }) => {
	return (
		<div className='min-h-screen flex flex-col'>
			<DashboardHeader />
			<div className='flex flex-1'>
				<DashboardSidebar />
				<main className='flex-1 bg-gray-100 p-6'>{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
