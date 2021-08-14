import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ComplaintForm from '../Components/ComplaintForm';
import Middleware from '../middleware/withAuth';

function Complaint() {
	return (
		<>
			<Navbar></Navbar>
			<ComplaintForm></ComplaintForm>
			<Footer />
		</>
	);
}
export default Middleware(Complaint);
