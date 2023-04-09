import pool from "../db/pool.js";
import idGen from "../util/idGen.js";

console.log("Beginning data input...");

for (let i = 1; i <= 20; i++) {
	try {
		let id = idGen(5);
		console.log(`Adding single room ${i} (ID ${id})`);

		let text = `INSERT INTO rooms (id, room_type_id, room_number, created_at) VALUES ($1, 1, $2, to_timestamp(${Date.now()} / 1000))`;
		let values = [id, 100 + i];
		let result = await pool.query(text, values);

		console.log(`Successfully added single room ${i}.\n`);
	} catch (err) {
		throw new Error(err);
	}
}

for (let i = 1; i <= 15; i++) {
	try {
		let id = idGen(5);
		console.log(`Adding double room ${i} (ID ${id})`);

		let text = `INSERT INTO rooms (id, room_type_id, room_number, created_at) VALUES ($1, 2, $2, to_timestamp(${Date.now()} / 1000))`;
		let values = [id, 200 + i];
		await pool.query(text, values);

		console.log(`Successfully added double room ${i}.\n`);
	} catch (err) {
		throw new Error(err);
	}
}

for (let i = 1; i <= 10; i++) {
	try {
		let id = idGen(5);
		console.log(`Adding twin room ${i} (ID ${id})`);

		let text = `INSERT INTO rooms (id, room_type_id, room_number, created_at) VALUES ($1, 3, $2, to_timestamp(${Date.now()} / 1000))`;
		let values = [id, 300 + i];
		await pool.query(text, values);

		console.log(`Successfully added twin room ${i}.\n`);
	} catch (err) {
		throw new Error(err);
	}
}

for (let i = 1; i <= 10; i++) {
	try {
		let id = idGen(5);
		console.log(`Adding triple room ${i} (ID ${id})`);

		let text = `INSERT INTO rooms (id, room_type_id, room_number, created_at) VALUES ($1, 4, $2, to_timestamp(${Date.now()} / 1000))`;
		let values = [id, 400 + i];
		await pool.query(text, values);

		console.log(`Successfully added triple room ${i}.\n`);
	} catch (err) {
		throw new Error(err);
	}
}

console.log("Data added succesfully");
process.exit();
