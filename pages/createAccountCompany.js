import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CreateCompany from '../Components/CreateCompany';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function CreateAccountCompany() {
	const [cookies] = useCookies();
	const router = useRouter();
	if (cookies.userToken || cookies.companyToken) {
		router.push('/');
		return null;
	}

	return (
		<>
			<Navbar></Navbar>
			<CreateCompany></CreateCompany>
			<Footer />
		</>
	);
}
