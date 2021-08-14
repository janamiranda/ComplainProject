export default handler;

function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getUserById();
		case 'PUT':
			return updateUser();
		case 'DELETE':
			return deleteUser();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function getUserById() {
		//TODO: getOneUser
		return res.status(200).json();
	}

	function updateUser() {
		try {
			//TODO: update user
			return res.status(200).json({});
		} catch (error) {
			return res.status(400).json({ message: error });
		}
	}

	function deleteUser() {
		//TODO: delete user
		return res.status(200).json({});
	}
}
