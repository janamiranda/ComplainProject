import React, { useState, useEffect } from 'react';
import {
	Icon,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Button,
	Container,
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { SearchIcon } from '@chakra-ui/icons';

export default function SearchBox() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [company, setCompany] = React.useState('');
	return (
		<>
			<Container maxW={'3xl'}>
				<InputGroup size="md" width="4.5 rem">
					<InputLeftElement pointerEvents="none" children={<SearchIcon />} />
					<Input
						pr="4.5rem"
						placeholder="Search for a company"
						onChange={(e) => setCompany(e.target.value)}
					/>

					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={onOpen}>
							Search
						</Button>
					</InputRightElement>
				</InputGroup>
			</Container>
			<SearchModal
				isOpen={isOpen}
				onClose={onClose}
				companyName={company}
			></SearchModal>
		</>
	);
}
const SearchModal = (props) => {
	const [data, setData] = React.useState([]);

	const fetchData = async () => {
		const response = await fetch(
			`/api/complaints/company/${props.companyName}`,
		);

		const complaintData = await response.json();
		console.log(complaintData);
		setData(complaintData);
	};
	React.useEffect(() => {
		fetchData();
	}, [props.isOpen]);

	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Modal Title</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{data ? (
						<Table variant="simple">
							<TableCaption>All the company's complain so far</TableCaption>
							<Thead>
								<Tr>
									<Th>Author</Th>
									<Th>Category</Th>
									<Th isNumeric>Title</Th>
									<Th isNumeric>Complain</Th>
								</Tr>
							</Thead>
							<Tbody>
								{data.map((complain) => {
									return (
										<Tr>
											<Td>{complain.user.name}</Td>
											<Td>{complain.category}</Td>
											<Td>{complain.title}</Td>
											<Td>{complain.complain}</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					) : (
						<div style={{ width: '100%', textAlign: 'center' }}>
							There is no complaints registered for this table
						</div>
					)}
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={props.onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
