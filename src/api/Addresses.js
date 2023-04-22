const url = "/api/account/addresses";

export const getAddresses = async (id = null) => {
	try {
		let endpoint;
		let response;

		if (id) {
			endpoint = new URL(url, window.location);
			endpoint.search = new URLSearchParams({ id }).toString();

			response = await fetch(endpoint);
			if (response.ok) return response.json();
		}

		endpoint = url;
		response = await fetch(endpoint);
		if (response.ok) return response.json();
	} catch (err) {
		console.error(err);
	}
};

export const createAddress = async (address1, address2 = null, townCity, countyStateProvince, postcodeZip, country) => {
	try {
		let response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ address1, address2, townCity, countyStateProvince, postcodeZip, country }),
		});
		if (response.status !== 503) return response.text();
	} catch (err) {
		console.error(err);
	}
};

export const updateAddress = async (id, address1 = null, address2 = null, townCity = null, countyStateProvince = null, postcodeZip = null, country = null) => {
	try {
		let endpoint = new URL(url, window.location);
		endpoint.search = new URLSearchParams({ id }).toString();

		let response = await fetch(endpoint, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ address1, address2, townCity, countyStateProvince, postcodeZip, country }),
		});
		if (response.status !== 503) return response.text();
	} catch (err) {
		console.error(err);
	}
};

export const deleteAddress = async (id) => {
	try {
		let endpoint = new URL(url, window.location);
		endpoint.search = new URLSearchParams({ id }).toString();

		let response = await fetch(endpoint, { method: "DELETE" });
		if (response.status !== 503) {
			if (!response.ok) return response.text();
			return;
		}
	} catch (err) {
		console.error(err);
	}
};
