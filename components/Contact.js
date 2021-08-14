import React from 'react';
import { Container, Stack, Text, Heading, Link } from '@chakra-ui/react';

import Image from 'next/image';
import ContactImage from '../images/Contact.png';

export default function AboutUs() {
	return (
		<Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
			<Image boxSize="400px" src={ContactImage} alt="Career image" />

			<Heading fontSize={'1xl'} textAlign={'left'}>
				We are exited to hear from you!
			</Heading>

			<Text color={'gray.600'} fontSize={'l'} textAlign={'left'}>
				Mailing Address: 21 Stephen Street Lower, Dublin
				<br></br>
				<br></br>
				<p>Email: hello@complainhere.ie | Phone: 1 533 1926</p>
				<br></br>
			</Text>
		</Stack>
	);
}
