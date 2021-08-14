import {
	Flex,
	Box,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

export default function CreateAccout() {
	return (
		<Flex
			minH={'70vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Create an account</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<Stack spacing={10}>
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}
							>
								{/* BUTTON */}
								<Stack direction="row" spacing={37} align="center">
									<Button colorScheme="orange" variant="outline">
										<a href="./createAccountConsumer">I'm a consumer</a>
									</Button>

									<Button colorScheme="orange" variant="outline">
										<a href="./createAccountCompany">I'm a company</a>
									</Button>
								</Stack>
								{/* BUTTON */}
							</Stack>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
