const url = "/api/account";

export const getUser = async () => {
	try {
		let response = await fetch(url);
		if (response.ok) return response.json();
	} catch (err) {
		console.error(err);
	}
};

export const updateUser = async (
	title = null,
	firstName = null,
	lastName = null,
	companyName = null,
	phone = null,
	email = null,
	currentPassword = null,
	newPassword = null,
	confirmNewPassword = null
) => {
	try {
		let response = await fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, firstName, lastName, companyName, phone, email, currentPassword, newPassword, confirmNewPassword }),
		});
		if (response.status !== 503) return response.text();
	} catch (err) {
		console.error(err);
	}
};

export const deleteUser = async () => {
	try {
		let response = await fetch(url, { method: "DELETE" });
		if (response.status !== 503) {
			if (!response.ok) return response.text();
			return;
		}
	} catch (err) {
		console.error(err);
	}
};

export const unlinkThirdParty = async () => {
	try {
		let response = await fetch(`${url}/third`, { method: "DELETE" });
		if (response.status !== 503) {
			if (!response.ok) return response.text();
			return;
		}
	} catch (err) {
		console.error(err);
	}
};
