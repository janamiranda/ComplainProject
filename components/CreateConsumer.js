import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';

import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Select,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function CreateConsumer() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [cookies, setCookie, removeCookie] = useCookies();
	const router = useRouter();
	const [error, setError] = useState();

	const onSubmit = async function (data) {
		const response = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.status >= 200 && response.status < 300) {
			const responseBody = await response.json();
			setCookie('userToken', responseBody.token, { path: '/' });
			router.push('/userDashboard');
		} else {
			setError('Something went wrong');
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
					<Heading fontSize={'4xl'}>
						Create a consumer account - {cookies.userToken}
					</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl id="name">
								<FormLabel>Name</FormLabel>
								<Input type="name" {...register('name')} />
							</FormControl>
							<FormControl id="email">
								<FormLabel>Email</FormLabel>
								<Input type="email" {...register('email')} />
							</FormControl>
							<FormControl id="phone">
								<FormLabel>Phone</FormLabel>
								<Input type="phone" {...register('phone')} />
							</FormControl>
							<FormControl id="pps">
								<FormLabel>PPS Number</FormLabel>
								<Input type="pps" {...register('ppsnumber')} />
							</FormControl>

							{/* CHOOSE COUNTIE */}
							<FormLabel>County</FormLabel>
							<Select placeholder="Select option" {...register('county')}>
								<option value="Antrim">Antrim</option>
								<option value="Armagh">Armagh</option>
								<option value="Carlow">Carlow</option>
								<option value="Cavan">Cavan</option>
								<option value="Clare">Clare</option>
								<option value="Cork">Cork</option>
								<option value="Derry">Derry</option>
								<option value="Donegal">Donegal</option>
								<option value="Down">Down</option>
								<option value="Dublin">Dublin</option>
								<option value="Fermanagh">Fermanagh</option>
								<option value="Galway">Galway</option>
								<option value="Kerry">Kerry</option>
								<option value="Kildare">Kildare</option>
								<option value="Kilkenny">Kilkenny</option>
								<option value="Laois">Laois</option>
								<option value="Leitrim">Leitrim</option>
								<option value="Limerick">Limerick</option>
								<option value="Longford">Longford</option>
								<option value="Louth">Louth</option>
								<option value="Mayo">Mayo</option>
								<option value="Meath">Meath</option>
								<option value="Monaghan">Monaghan</option>
								<option value="Offaly">Offaly</option>
								<option value="Roscommon">Roscommon</option>
								<option value="Sligo">Sligo</option>
								<option value="Tipperary">Tipperary</option>
								<option value="Tyrone">Tyrone</option>
								<option value="Waterford">Waterford</option>
								<option value="Westmeath">Westmeath</option>
								<option value="Wexford">Wexford</option>
								<option value="Wicklow">Wicklow</option>
							</Select>
							{/* CHOOSE COUNTIE */}
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
									<Text>Already have an account?</Text>
									<Link color={'orange.400'}>Sign in!</Link>
								</Stack>
								<Button
									bg={'orange.400'}
									color={'white'}
									_hover={{
										bg: 'orange.500',
									}}
									type="submit"
								>
									Submit
								</Button>
							</Stack>
						</form>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
