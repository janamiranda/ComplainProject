import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Select,
	Text,
	useColorModeValue,
	Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import fetcher from '../lib/fetcher';

export default function ComplaintForm(props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const [cookies, setCookie, removeCookie] = useCookies();

	if (!cookies.userToken) {
		router.push('/');
	}
	const { data, error } = useSWR(
		['/api/companies', cookies.userToken],
		fetcher,
	);

	const onSubmit = async function (data) {
		const response = await fetch('/api/complaints', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: cookies.userToken,
			},
			body: JSON.stringify(data),
		});
		if (response.status >= 200 && response.status < 300) {
			return router.push('/userDashboard');
		}
	};

	return (
		<>
			<Flex
				minH={'80vh'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('gray.50', 'gray.800')}
			>
				<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'}>Let's get started</Heading>
					</Stack>
					<Box
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={8}
					>
						<Stack spacing={4}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<FormControl id="category">
									<FormLabel>Category</FormLabel>
									<Select placeholder="Select option" {...register('category')}>
										<option value="E-commerce">E-commerce</option>
										<option value="Tourism">Tourism</option>
										<option value="Food">Food and Beverage</option>
										<option value="Bank">Bank</option>
										<option value="Beauty">Beauty</option>
										<option value="Home">Home and Construction</option>
										<option value="Education">Education</option>
										<option value="Clothing">Clothing</option>
										<option value="Internet">Internet</option>
										<option value="Eletricity">Eletricity</option>
										<option value="Others">Others</option>
									</Select>
								</FormControl>
								<FormControl id="company">
									<FormLabel>Company</FormLabel>
									<Select
										placeholder="Select option"
										{...register('company_id')}
									>
										{data &&
											data.map((company) => (
												<option value={company.id}>{company.name}</option>
											))}
									</Select>
								</FormControl>
								<FormControl id="title">
									<FormLabel>Title of your story</FormLabel>
									<Input type="title" {...register('title')} />
								</FormControl>

								<Stack spacing={10}>
									<FormControl id="wrong">
										<FormLabel>What's wrong?</FormLabel>
										<Textarea
											boxSize="sm"
											type="wrong"
											placeholder="Type your complaint here"
											{...register('complain')}
										/>
									</FormControl>

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
		</>
	);
}
