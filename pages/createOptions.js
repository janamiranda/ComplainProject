import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CreateAccount from '../Components/CreateAccount';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function Login() {
	const [cookies] = useCookies();
	const router = useRouter();
	if (cookies.userToken || cookies.companyToken) {
		router.push('/');
		return null;
	}

	return (
		<>
			<Navbar></Navbar>
			<CreateAccount></CreateAccount>
			<Footer />
		</>
	);
}
