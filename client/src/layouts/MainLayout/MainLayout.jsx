import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const MainLayout = ({ children }) => {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<div className='flex'>
				<Sidebar />
				<main className='flex-1 p-6'>{children}</main>
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
