/* FUNCTION */
const displayErrorMessage = (response, messageOnly = false) => {
	const status = document.getElementById("status");

	if (response.includes("undefined") || response === "An unknown error occurred. Kindly try again.") {
		// Display generic error message
		if (messageOnly) return "An unknown error occurred. Kindly try again.";
		status.textContent = "An unknown error occurred. Kindly try again.";
	} else {
		// Remove "Error: " from error message
		response = response.split(" ");
		response.shift();
		response = response.join(" ");

		// Display error message
		if (messageOnly) return response;
		status.textContent = response;
	}
};

/* EXPORT */
export default displayErrorMessage;
