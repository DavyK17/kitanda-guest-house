const url = "/api/room-types";

export const getRoomTypes = async (id = null) => {
	try {
		let endpoint;

		if (id) {
			endpoint = new URL(url, window.location);
			endpoint.search = new URLSearchParams({ id }).toString();
		} else {
			endpoint = url;
		}

		let response = await fetch(endpoint);
		if (!response.ok) return response.text();
		return response.json();
	} catch (err) {
		console.error(err);
	}
};

export const getAvailableRoomTypes = async (checkInDate, checkOutDate) => {
	try {
		let endpoint = new URL(url, window.location);
		endpoint.search = new URLSearchParams({ checkInDate, checkOutDate }).toString();

		let response = await fetch(endpoint);
		if (!response.ok) return response.text();
		return response.json();
	} catch (err) {
		console.error(err);
	}
};
