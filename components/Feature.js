import {
	Box,
	Container,
	Heading,
	SimpleGrid,
	Icon,
	Text,
	Stack,
	HStack,
	VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

export default function Feature() {
	return (
		<Box p={4}>
			<Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
				<Heading fontSize={'3xl'}>You're in good company!</Heading>
				<Text color={'gray.600'} fontSize={'xl'}>
					Check here the advantages of sharing your experiences with us and the
					world!
				</Text>
			</Stack>

			<Container maxW={'6xl'} mt={10}>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
					<HStack align={'top'}>
						<Box color={'green.400'} px={2}>
							<Icon as={CheckIcon} />
						</Box>
						<VStack align={'start'}>
							<Text fontWeight={600}>Save other people's time</Text>
							<Text color={'gray.600'}>
								Many people will have access to your complaint, thus letting
								them know what has already been done to resolve your issue.
							</Text>
						</VStack>
					</HStack>
					<HStack align={'top'}>
						<Box color={'green.400'} px={2}>
							<Icon as={CheckIcon} />
						</Box>
						<VStack align={'start'}>
							<Text fontWeight={600}>Show that you are dissatisfied</Text>
							<Text color={'gray.600'}>
								Make it clear in an online place and publish the setbacks you
								had with companies and what they did to help you.
							</Text>
						</VStack>
					</HStack>
					<HStack align={'top'}>
						<Box color={'green.400'} px={2}>
							<Icon as={CheckIcon} />
						</Box>
						<VStack align={'start'}>
							<Text fontWeight={600}>Get a quick answer</Text>
							<Text color={'gray.600'}>
								Companies have the opportunity to speak directly with you
								without the intermediary of an attorney or without taking the
								case to court.
							</Text>
						</VStack>
					</HStack>
					<HStack align={'top'}>
						<Box color={'green.400'} px={2}>
							<Icon as={CheckIcon} />
						</Box>
						<VStack align={'start'}>
							<Text fontWeight={600}>Research about reputation</Text>
							<Text color={'gray.600'}>
								Before buying, you can check if a company is good in its
								after-sales and then decide if you are going to make the
								purchase or not.
							</Text>
						</VStack>
					</HStack>
				</SimpleGrid>
			</Container>
		</Box>
	);
}
