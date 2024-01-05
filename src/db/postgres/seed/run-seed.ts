import { users, music, reviews } from "./../data/test-data.json";
import { seed } from "./seed";
import db from "../connection";

const runSeed = async () => {
	try {
		await seed(users as [], music as [], reviews as []);
		db.end;
	} catch (e) {
console.log(e);	}
};
runSeed();

export default runSeed;
