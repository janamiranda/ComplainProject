// Return all companies
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// /api/companies?name=tim
export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getCompanies();
		case 'POST':
			return createCompany();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	async function getCompanies() {
		const companies = await prisma.company.findMany();
		return res.status(200).json(companies);
	}

	async function createCompany() {
		if (
			!req.body.email ||
			!req.body.password ||
			!req.body.name ||
			!req.body.phone ||
			!req.body.county ||
			!req.body.taxpayernumber
		) {
			res.status(400).json({ message: 'invalid body' });
			return;
		}

		const token = Math.random().toString(36);
		const company = await prisma.company.create({
			data: {
				email: req.body.email,
				name: req.body.name,
				password: req.body.password,
				taxpayernumber: req.body.taxpayernumber,
				county: req.body.county,
				phone: req.body.phone,
				token: token,
			},
		});
		if (company) {
			res.status(201).json({ token });
		} else {
			res.status(500).json({ message: 'error creating user' });
		}
	}
}
