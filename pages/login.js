import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Form from '../Components/Form';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

function Login() {
	const [cookies] = useCookies();
	const router = useRouter();
	if (cookies.userToken || cookies.companyToken) {
		router.push('/');
		return null;
	}
	return (
		<>
			<Navbar></Navbar>
			<Form></Form>
			<Footer />
		</>
	);
}

export default Login;
