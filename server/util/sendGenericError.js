const sendGenericError = (res) => res.status(500).send("An unknown error occurred. Kindly try again.");

export default sendGenericError;
