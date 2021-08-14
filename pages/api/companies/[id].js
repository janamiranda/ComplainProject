export default function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getCompanyById();
		case 'PUT':
			return updateCompany();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function getCompanyById() {
		//TODO: get a single company
		return res.status(200).json();
	}

	function updateCompany() {
		try {
			//TODO: updateCompany table
		} catch (error) {
			return res.status(400).json({ message: error });
		}
	}
}
