import { useSelector } from 'react-redux';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
const MainLayout = ({ children }) => {
	const { user } = useSelector((state) => state.auth);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className='min-h-screen bg-gray-100'>
			<Header
				data={user}
				toggleSidebar={toggleSidebar}
				isSidebarOpen={isSidebarOpen}
			/>
			<div className='flex'>
				<Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
				<main className='flex-1 p-6 sm:mt-10'>{children}</main>
			</div>
		</div>
	);
};

export default MainLayout;
