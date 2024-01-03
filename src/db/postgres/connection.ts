import { Pool, PoolConfig } from "pg";
import * as dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "dev";

dotenv.config({ path: `${__dirname}/../../../.env.${ENV}` });

const config = {} as PoolConfig ;

if (ENV === "prod") {
	config.ssl = { rejectUnauthorized: false };
}

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
	throw new Error("PGDATABASE or DATABASE_URL not set");
}

export default new Pool(config);