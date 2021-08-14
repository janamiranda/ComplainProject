import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CreateConsumer from '../Components/CreateConsumer';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function CreateAccountComsumer() {
	const [cookies] = useCookies();
	const router = useRouter();
	if (cookies.userToken || cookies.companyToken) {
		router.push('/');
		return null;
	}

	return (
		<>
			<Navbar></Navbar>
			<CreateConsumer></CreateConsumer>
			<Footer />
		</>
	);
}
