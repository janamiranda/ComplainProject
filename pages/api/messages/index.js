// Return all companies
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// /api/companies?name=tim
export default async function handler(req, res) {
	console.log(req.body);
	if (!req.body.complain_id || !req.body.response) {
		res.status(400).json({ message: 'invalid body' });
		return;
	}

	const complainMessage = await prisma.complain_message.create({
		data: {
			complain_message: req.body.response,
			complain_id: Number(req.body.complain_id),
		},
	});
	if (complainMessage) {
		res.status(201).json({ complainMessage });
	} else {
		res.status(401).json({ message: 'error creating user' });
	}
}
