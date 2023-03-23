const getUserName = (email) => {
	const rtn = email.split('@')[0];
	console.log(rtn)
	return rtn;
};

export { getUserName };
