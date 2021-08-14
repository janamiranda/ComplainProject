import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

export default function Form() {
	const { register, handleSubmit } = useForm();

	const router = useRouter();
	const [Cookies, setCookie] = useCookies();
	const [error, setError] = useState();

	const onSubmit = async function (data) {
		const response = await fetch('/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.status >= 200 && response.status < 300) {
			const responseBody = await response.json();
			console.log(responseBody);
			setCookie(
				responseBody.taxpayernumber ? 'companyToken' : 'userToken',
				responseBody.token,
				{ path: '/' },
			);
			router.push(
				responseBody.taxpayernumber ? '/companyDashboard' : '/userDashboard',
			);
		} else {
			setError('Invalid credentials');
		}
	};

	return (
		<Flex
			minH={'70vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy all of our cool features ✌️
					</Text>
					<Text fontSize={'lg'} color={'gray.600'}>
						{error}
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl id="email">
								<FormLabel>Email address</FormLabel>
								<Input type="email" {...register('email')} />
							</FormControl>
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input type="password" {...register('password')} />
							</FormControl>
							<Stack spacing={10}>
								<Stack
									direction={{ base: 'column', sm: 'row' }}
									align={'start'}
									justify={'space-between'}
								>
									<Checkbox>Remember me</Checkbox>
									<Link color={'blue.400'}>Forgot password?</Link>
								</Stack>
								<Button
									bg={'orange.400'}
									color={'white'}
									_hover={{
										bg: 'orange.500',
									}}
									type="submit"
								>
									Sign in
								</Button>
							</Stack>
						</form>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
