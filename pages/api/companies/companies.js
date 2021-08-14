// Return all complaints associated to a company

// Return all companies
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
	console.log(req.query);
	if (req.method !== 'GET') {
		res.status(404).json({ message: 'Only GET requests allowed' });
		return;
	}

	const company = await prisma.company.findFirst({
		where: {
			name: req.body.name,
		},
		orderBy: {
			name: 'asc', //also ordered by RATE
		},
	});

	console.log(company);

	res.status(200).json(company);
}
