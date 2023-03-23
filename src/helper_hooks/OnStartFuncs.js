import { getUserName } from './stringManipulation';

const verifyLoggedIn = async (BaseURL) => {
	try {
		const token = localStorage.getItem('token');
		if (token) {
			const res = await fetch(`${BaseURL}auth`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				return getUserName(data.email);
			}
		}	
	} catch (error) {
		console.log(error);
	}
};

export { verifyLoggedIn };
