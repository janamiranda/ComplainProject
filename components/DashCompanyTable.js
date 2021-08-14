// import { useCookies } from "react-cookie";
import Cookies from 'universal-cookie';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

import {
	Flex,
	Box,
	TableCaption,
	Stack,
	Table,
	Thead,
	Th,
	Tr,
	Td,
	Tbody,
	Button,
	Heading,
	useColorModeValue,
	Modal,
	ModalOverlay,
	FormControl,
	FormLabel,
	Input,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Collapse,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ViewIcon } from '@chakra-ui/icons';

import useSWR from 'swr';

import fetcher from '../lib/fetcher';

export default function DashCompanyTable(props) {
	const [cookies] = useCookies();

	const router = useRouter();
	const { data, error } = useSWR(
		['/api/complaints', cookies.companyToken],
		fetcher,
	);

	if (!cookies.companyToken) {
		router.push('/userDashboard');
		return null;
	}

	return (
		<>
			<Stack spacing={8} mx={'auto'} maxW={'70%'} f py={12} px={1}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>My complaints</Heading>
				</Stack>
				<Box
					mt="1"
					fontWeight="semibold"
					lineHeight="tight"
					isTruncated
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={6}
				>
					<Table variant="striped" colorScheme="orange">
						<TableCaption>That is your list of complaints</TableCaption>
						<Thead>
							<Tr>
								<Th>Status</Th>
								<Th>Protocol Number</Th>
								<Th>Company</Th>
								<Th>Actions</Th>
								<Th>Rate</Th>
							</Tr>
						</Thead>
						<Tbody>
							{data ? (
								data.map((item) => <TableRow item={item} />)
							) : (
								<div style={{ textAlign: 'center', width: '100%' }}>
									No complaints yet registered for you'
								</div>
							)}
						</Tbody>
					</Table>

					<Button
						align={'center'}
						justify={'center'}
						bg={'orange.400'}
						color={'white'}
						_hover={{
							bg: 'orange.500',
						}}
					>
						Back to Home
					</Button>
				</Box>
			</Stack>
		</>
	);
}

const TableRow = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Tr key={props.item.id}>
				<Td>{props.item.status}</Td>
				<Td>{props.item.id}</Td>
				<Td>{props.item.company.name}</Td>
				<Td>
					<Button
						align={'center'}
						justify={'center'}
						bg={'orange.400'}
						color={'white'}
						_hover={{
							bg: 'orange.500',
						}}
						onClick={onOpen}
					>
						<ViewIcon w={6} h={6} />
					</Button>
				</Td>
				<Td>{props.item.rate}</Td>
				<ComplaintModal
					isOpen={isOpen}
					onClose={onClose}
					userMessage={props.item.complain}
					title={props.item.title}
					complain_id={props.item.id}
					messages={props.item.complain_message}
					status={props.item.status}
				/>
			</Tr>
		</>
	);
};

const ComplaintModal = (props) => {
	const { isOpen, onToggle } = useDisclosure();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState('');
	const router = useRouter();

	const isThereResponse = props.messages.length == 0 ? false : true;

	const onSubmit = async (data) => {
		const response = await fetch('/api/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.status >= 200 && response.status < 300) {
			router.push('/userDashboard');
		} else {
			setError('Something went wrong');
		}
	};

	console.log(props);

	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{props.title} - {`Status: ${props.status}`}
				</ModalHeader>
				<ModalCloseButton />
				<span>{error}</span>
				<ModalBody>
					<div>
						<b>User message:</b>
						<div style={{ height: 75 }}>{props.userMessage}</div>
						{isThereResponse ? (
							<div style={{ textAlign: 'right', height: 125 }}>
								<b> Your message: </b>
								{props.messages.map((item) => {
									return <div>{item.complain_message}</div>;
								})}
							</div>
						) : null}
					</div>
					{!isThereResponse || !props.status == 'Closed' ? (
						<Button onClick={onToggle} width={'100%'}>
							Add response
						</Button>
					) : null}
				</ModalBody>
				<Collapse in={isOpen} animateOpacity>
					<Box p="15px" color="white" rounded="md">
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl>
								<FormLabel color="black">Response:</FormLabel>
								<Input
									placeholder="Type your response"
									color="black"
									{...register('response')}
								/>
								<Input
									placeholder="Type your response"
									color="black"
									style={{ display: 'none' }}
									value={props.complain_id}
									{...register('complain_id')}
								/>
							</FormControl>

							<ModalFooter>
								<Button colorScheme="blue" mr={3} type="submit">
									Save
								</Button>
							</ModalFooter>
						</form>
					</Box>
				</Collapse>
			</ModalContent>
		</Modal>
	);
};
