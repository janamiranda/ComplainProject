import React from 'react';
import { Box, Container, Stack, Text, Heading, Link } from '@chakra-ui/react';
import Image from 'next/image';

import CareerImage from '../images/Career.png';

export default function AboutUs() {
	return (
		<Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
			<Image boxSize="400px" src={CareerImage} alt="Career image" />

			<Heading fontSize={'1xl'} textAlign={'left'}>
				Software Engineer
			</Heading>
			<Text color={'gray.600'} fontSize={'l'} textAlign={'left'}>
				<p>Start Date - Immediate.</p>
				<br></br>
				<p>
					This role as Software Engineer Front End is for the team that owns the
					frontend for Tables in Complain Here. Almost every single Application
					in Complain Here utilises the Tables component to show repetitive data
					and enable rich interactions with it, rendering an average of 1
					billion rows per day. With that scale and the requirement of providing
					an outstanding user experience, this role will challenge you to think
					out of the box, being capable to understand the bigger picture and
					help shape it while writing and maintaining solid, robust, efficient
					and maintainable high quality code using frameworks and tools. Don’t
					have some of these skills? No problem, if you are happy to learn, we
					are happy to teach you.
					<ul>
						<br></br>
						<li>
							Writing and maintaining solid, robust, efficient and maintainable
							high quality code
						</li>
						<li>
							Build proof of concepts to help steer the development approach for
							features.
						</li>
						<li>
							Mentor and learn from other team members through pairing, code
							reviews, documenting code and our Freedom Fridays initiative.
						</li>
						<li>Start salary €7.456</li>
						<br></br>
					</ul>
				</p>
			</Text>
		</Stack>
	);
}
