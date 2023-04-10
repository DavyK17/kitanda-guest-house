// Import database pool
import pool from "../db/pool.js";

// Login attempt log function
const loginAttempt = async (id, ip, email, strategy, success) => {
	let text = `INSERT INTO login_attempts (id, ip, email, strategy, attempted_at, successful) VALUES ($1, $2, $3, $4, to_timestamp(${Date.now()} / 1000), $5)`;
	let values = [id, ip, email, strategy, success];
	return await pool.query(text, values);
};

// Export
export default loginAttempt;
