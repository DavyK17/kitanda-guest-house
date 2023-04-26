// User
export const user = (confirmed = true) => ({
	id: "1234567890",
	email: "thisisan@email.com",
	federatedCredentials: [
		{
			id: "012345678901234567890",
			provider: "google",
			confirmed,
		},
	],
});

// Account
export const account = (confirmed = true) => ({
	id: "1234567890",
	title: "Mr.",
	firstName: "Mwenyeji",
	lastName: "Mkenya",
	companyName: "Enterprise Limited",
	phone: 254712345678,
	email: "thisisan@email.com",
	federatedCredentials: [
		{
			id: "012345678901234567890",
			provider: "google",
			confirmed,
		},
	],
});

// Addresses
export const addresses = [
	{
		id: "123456789012",
		address1: "A1 Nice Apartments, Wide Road",
		address2: "P.O. Box 0000",
		townCity: "Nairobi",
		countyStateProvince: "Nairobi County",
		postcodeZip: "00100",
		country: "Kenya",
		createdAt: "2023-04-12T21:05:33.000Z",
	},
	{
		id: "012345678901",
		address1: "B2 Decent Estate, Narrow Avenue",
		address2: "P.O. Box 1111",
		townCity: "Nairobi",
		countyStateProvince: "Nairobi County",
		postcodeZip: "00100",
		country: "Kenya",
		createdAt: "2023-04-13T19:10:44.000Z",
	},
];

// Reservations
export const reservations = [
	{
		id: "7925492",
		checkInDate: "2023-04-23T21:00:00.000Z",
		checkOutDate: "2023-04-24T21:00:00.000Z",
		totalPrice: 9200,
		createdAt: "2023-04-22T19:28:22.000Z",
		status: "confirmed",
	},
	{
		id: "2839058",
		checkInDate: "2023-04-25T21:00:00.000Z",
		checkOutDate: "2023-04-26T21:00:00.000Z",
		totalPrice: 3000,
		createdAt: "2023-04-24T18:07:36.000Z",
		status: "cancelled",
	},
	{
		id: "4989796",
		checkInDate: "2023-04-27T21:00:00.000Z",
		checkOutDate: "2023-04-30T21:00:00.000Z",
		totalPrice: 7200,
		createdAt: "2023-04-24T17:42:04.000Z",
		status: "pending",
	},
];

// Room types
export const roomTypes = [
	{
		id: 1,
		name: "Single room",
		features: ["1 single bed"],
		numOfAdults: 1,
		numOfChildren: 1,
		numOfInfants: 0,
		pricePerNight: 3000,
	},
	{
		id: 2,
		name: "Double room",
		features: ["1 double bed"],
		numOfAdults: 2,
		numOfChildren: 2,
		numOfInfants: 1,
		pricePerNight: 3500,
	},
	{
		id: 3,
		name: "Twin room",
		features: ["1 twin bed"],
		numOfAdults: 2,
		numOfChildren: 1,
		numOfInfants: 0,
		pricePerNight: 3700,
	},
	{
		id: 4,
		name: "Triple room",
		features: ["1 single bed", "1 double bed"],
		numOfAdults: 3,
		numOfChildren: 3,
		numOfInfants: 2,
		pricePerNight: 5500,
	},
];
