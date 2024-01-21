import * as dotenv from "dotenv";

dotenv.config(); 

const config = {
	port: process.env.PORT || 3000,
	databaseName : process.env.DB_NAME,
	databaseUrl : process.env.DB_URL,
	databaseUser : process.env.DB_USER,
	databasePass: process.env.DB_PASS
}

export default config;
