const url = "/api/auth";

export const getUser = async () => {
	try {
		let response = await fetch(`${url}/user`);
		if (response.ok) return response.json();
	} catch (err) {
		console.error(err);
	}
};

export const register = async (
	title = null,
	firstName,
	lastName,
	companyName = null,
	address1,
	address2 = null,
	townCity,
	countyStateProvince = null,
	postcodeZip,
	country,
	phone = null,
	email,
	password,
	confirmPassword
) => {
	try {
		let response = await fetch(`${url}/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, firstName, lastName, companyName, address1, address2, townCity, countyStateProvince, postcodeZip, country, phone, email, password, confirmPassword }),
		});

		if (response.status !== 503) return response.text();
	} catch (err) {
		console.error(err);
	}
};

export const confirmThirdPartyRegistration = async (address1, address2, townCity, countyStateProvince, postcodeZip, country, password, confirmPassword) => {
	try {
		let response = await fetch(`${url}/register/ctpr`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ address1, address2, townCity, countyStateProvince, postcodeZip, country, password, confirmPassword }),
		});

		if (response.status !== 503) {
			if (!response.ok) return response.text();
			return response.json();
		}
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
