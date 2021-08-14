import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const Middleware = (WrappedComponent) => {
	return (props) => {
		if (typeof window !== 'undefined') {
			const Router = useRouter();
			const [cookies] = useCookies();

			if (!cookies.userToken && !cookies.companyToken) {
				Router.replace('/');
				return null;
			}

			return <WrappedComponent {...props} />;
		}

		return null;
	};
};

export default Middleware;
