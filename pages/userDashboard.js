import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import DashTable from '../Components/DashTable';
import Middleware from '../middleware/withAuth';

function UserDashboard() {
	return (
		<>
			<Navbar></Navbar>
			<DashTable></DashTable>
			<Footer />
		</>
	);
}

export default Middleware(UserDashboard);
