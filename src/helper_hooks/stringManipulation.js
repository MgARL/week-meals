const getUserName = (email) => {
	return email.split('@')[0];
};

export { getUserName };
