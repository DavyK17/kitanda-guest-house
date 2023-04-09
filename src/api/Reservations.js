const url = "/api/reservations";

export const getReservations = async (id = null, email = null) => {
    try {
        let endpoint;
        let response;

        if (id) {
            endpoint = new URL(url, window.location);

            if (email) {
                endpoint.search = new URLSearchParams({ email, id }).toString();
            } else {
                endpoint.search = new URLSearchParams({ id }).toString();
            }

            response = await fetch(endpoint);
            if (response.ok) return response.json();
        }

        endpoint = url;
        response = await fetch(endpoint);
        if (response.ok) return response.json();
    } catch (err) {
        console.error(err);
    }
}

export const cancelReservation = async (id = null, email = null) => {
    try {
        let endpoint;
        let response;

        if (id) {
            endpoint = new URL(`${url}/cancel`, window.location);

            if (email) {
                endpoint.search = new URLSearchParams({ email, id }).toString();
            } else {
                endpoint.search = new URLSearchParams({ id }).toString();
            }

            response = await fetch(endpoint);
            if (response.ok) return response.json();
        }

        endpoint = `${url}/cancel`;
        response = await fetch(endpoint);
        if (response.ok) return response.json();
    } catch (err) {
        console.error(err);
    }
}

export const makeReservation = async (phone, checkInDate, checkOutDate, rooms, email) => {
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, checkInDate, checkOutDate, rooms, email })
        });
        if (response.status !== 503) return response.text();
    } catch (err) {
        console.error(err);
    }
}