const url = "/api/auth";

export const getUser = async () => {
	try {
		let response = await fetch(`${url}/user`);
		if (response.ok) return response.json();
	} catch (err) {
		console.error(err);
	}
};

export const register = async (firstName, lastName, companyName, phone, email, password, confirmPassword) => {
	try {
		let response = await fetch(`${url}/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ firstName, lastName, companyName, phone, email, password, confirmPassword }),
		});

		if (response.status !== 503) return response.text();
	} catch (err) {
		console.error(err);
	}
};

export const login = async (email, password) => {
	try {
		let response = await fetch(`${url}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (response.status !== 503) {
			if (!response.ok) return response.text();
			return response.json();
		}
	} catch (err) {
		console.error(err);
	}
};

export const logout = async () => {
	try {
		let response = await fetch(`${url}/logout`);
		if (response.ok) return response.text();
	} catch (err) {
		console.error(err);
	}
};
