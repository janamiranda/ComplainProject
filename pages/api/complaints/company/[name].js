// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getCompanyComplain();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getCompanyComplain() {
		const { name } = req.query;

		const company = await prisma.company.findFirst({
			where: {
				name: name,
			},
		});
		console.log(company);
		const complains = await prisma.complain.findMany({
			where: {
				company_id: company.id,
			},
			include: {
				user: true,
			},
		});

		if (complains) {
			return res.status(200).json(complains);
		} else {
			return res.status(404).end(`Not found`);
		}
	}
}
