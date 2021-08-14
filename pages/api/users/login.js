// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(404).json({ message: 'Only POST requests allowed' });
		return;
	}
	if (!req.body.email || !req.body.password) {
		res.status(400).json({ message: 'invalid credentials' });
		return;
	}

	const user = await prisma.user.findFirst({
		where: {
			email: req.body.email,
			password: req.body.password,
		},
	});

	const company = await prisma.company.findFirst({
		where: {
			email: req.body.email,
			password: req.body.password,
		},
	});

	if (user || company) {
		res.status(200).json(user || company);
	} else {
		res.status(404).json({ message: 'user not found' });
	}
}
