import { getUserName } from './stringManipulation';

const verifyLoggedIn = async (BaseURL) => {
	try {
		const token = localStorage.getItem('token');
		if (token) {
			const res = await fetch(`${BaseURL}authorize`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				return getUserName(data.user.email);
			}
		}	
	} catch (error) {
		console.error(error);
	}
};

export { verifyLoggedIn };
