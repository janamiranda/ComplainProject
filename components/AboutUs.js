import React from 'react';
import { Container, Stack, Text, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import HistoryImage from '../images/History.png';

export default function AboutUs() {
	return (
		<Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
			<Image boxSize="400px" src={HistoryImage} alt="Career image" />

			<Heading fontSize={'3xl'}>Dig in our history!</Heading>
			<Text color={'gray.600'} fontSize={'l'} textAlign={'left'}>
				In one particular real-life situation I found myself doing an online
				search for where to complain about a service from an electric company in
				Dublin. The energy bill was exceedingly high and after doing numerous
				tests to see if the value would go down, I and the people who lived with
				me decided that we would have to take the complaint to another level,
				since we had already gone through the first stage, which was call the
				company and try to solve. The next natural step for me would be to go
				complain on the internet, in a place where people could see, either so
				that they would not experience the same problem or so that they would
				take my situation as an example to solve their problem. In the end, we
				looked for support in Facebook groups, which is a place where you have
				visibility and freedom, but the social network was not created and
				designed to exclusively absorb complaints. And that was when the idea
				arose to mirror something that has already been seen and consolidated
				and validated in other countries, which is a platform where the
				objective is to expose the problem, the attempts to solve it and the
				positioning of companies in this regard. And that was how Complain Here
				was conceived.
				<br></br>
				<p>Janaina Miranda | Founder</p>
			</Text>
		</Stack>
	);
}
