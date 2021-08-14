// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getUser();
		case 'POST':
			return createUser();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function createUser() {
		if (
			!req.body.email ||
			!req.body.password ||
			!req.body.name ||
			!req.body.county ||
			!req.body.phone ||
			!req.body.ppsnumber
		) {
			res.status(400).json({ message: 'invalid body' });
			return;
		}

		const token = Math.random().toString(36);

		const user = await prisma.user.create({
			data: {
				email: req.body.email,
				name: req.body.name,
				password: req.body.password,
				pps: req.body.ppsnumber,
				county: req.body.county,
				phone: req.body.phone,
				token: token,
			},
		});

		if (user) {
			res.status(201).json({ token });
		} else {
			res.status(500).json({ message: 'error creating user' });
		}
	}

	async function getUser() {
		const users = await prisma.user.findMany();
		return res.status(200).json(users);
	}
}
