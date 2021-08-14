import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import DashCompanyTable from '../Components/DashCompanyTable';
import Middleware from '../middleware/withAuth';

function DashboardCompany() {
	return (
		<>
			<Navbar></Navbar>
			<DashCompanyTable></DashCompanyTable>
			<Footer />
		</>
	);
}

export default Middleware(DashboardCompany);
