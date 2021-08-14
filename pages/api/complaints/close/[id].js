// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'PUT':
			return closeComplain();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function closeComplain() {
		const { id } = req.query;
		if (!id) {
			return res.status(401).end('Id is missing');
		}

		const complaint = await prisma.complain.update({
			where: {
				id: Number(id),
			},
			data: {
				status: 'Closed',
			},
		});

		if (!complaint) {
			return res.status(401).json({ message: 'unauthorized user' });
		}

		return res.status(200).json({ complaint, status: 200 });
	}
}
