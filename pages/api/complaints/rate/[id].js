// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'PUT':
			return updateComplain();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	async function updateComplain() {
		const { id } = req.query;
		const { rate } = req.body;

		if (!id && !rate) {
			return res.status(401).end('Id or rate is missing');
		}

		const complaint = await prisma.complain.update({
			where: {
				id: Number(id),
			},
			data: {
				rate: Number(rate),
			},
		});
		if (!complaint) {
			return res.status(401).json({ message: 'complaint not found' });
		}
		return complaint;
	}
}
