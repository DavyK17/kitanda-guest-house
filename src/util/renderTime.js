// Function
const renderTime = (time, dateOnly = false) => {
	let options = { day: "numeric", month: "long", year: "numeric" };
	if (!dateOnly) options = { ...options, hour: "numeric", minute: "2-digit", hour12: true };

	let dateTime = new Intl.DateTimeFormat("en-KE", options);
	return dateTime.format(new Date(time));
};

// Export
export default renderTime;
