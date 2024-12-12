import { useSelector } from 'react-redux';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import FileUpload from '../../components/FileUpload';
const MainLayout = ({ children }) => {
	const { user: data } = useSelector((state) => state.auth);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const { username, email } = data.user;

	return (
		<div className='min-h-screen bg-gray-100 overflow-x-scroll'>
			<Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
			<div className='flex'>
				<Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
				<main className='flex-1 p-6 sm:mt-10'>
					<section className=' flex items-center space-x-6'>
						<h2 className='font-semibold text-lg'>Dashboard</h2>
						<div className='flex-1' /> {/* Spacer for alignment */}
						<div className=' flex flex-col'>
							<span className='text-sm text-gray-700'>
								Username: {username}
							</span>
							<span className='text-sm text-gray-500'>Email: {email}</span>
						</div>
					</section>
					{children}

					{/* <FileUpload /> */}
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
