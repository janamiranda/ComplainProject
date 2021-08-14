// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getComplaints();
		case 'POST':
			return createComplaints();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getComplaints() {
		const company = await prisma.company.findFirst({
			where: {
				token: req.headers.authorization || '',
			},
		});

		const user = await prisma.user.findFirst({
			where: {
				token: req.headers.authorization || '',
			},
		});

		if (company) {
			const companyComplaints = await prisma.complain.findMany({
				include: {
					company: true,
					user: true,
					complain_message: true,
				},
				where: {
					company_id: company.id,
				},
			});
			return res.status(200).json(companyComplaints);
		}
		if (user) {
			const userComplaints = await prisma.complain.findMany({
				include: {
					company: true,
					user: true,
					complain_message: true,
				},
				where: {
					user_id: user.id,
				},
			});
			return res.status(200).json(userComplaints);
		}
		return res.status(401).json('Something went wrong');
	}

	async function createComplaints() {
		const user = await prisma.user.findFirst({
			where: {
				token: req.headers.authorization,
			},
		});

		if (!user) {
			res.status(401).json({ message: 'User must be logged in' });
			return;
		}

		if (
			!req.body.title ||
			!req.body.company_id ||
			!req.body.complain ||
			!req.body.category ||
			!user.id
		) {
			res.status(400).json({ message: 'invalid body' });
			return;
		}

		const complain = await prisma.complain.create({
			data: {
				company_id: Number(req.body.company_id),
				user_id: user.id,
				title: req.body.title,
				complain: req.body.complain,
				category: req.body.category,
				status: 'In Progress',
			},
		});
		if (complain) {
			res.status(201).json({ complain });
		} else {
			res.status(500).json({ message: 'error creating user' });
		}
	}
}
