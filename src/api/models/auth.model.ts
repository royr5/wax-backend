import client from "../../db/mongodb/connection";

export const authenticateUser = async (username: string, password: string) => {
  try {
    const mCl = await client.connect();

    const mDb = mCl.db("gatefold_users");

    const mCol = mDb.collection("users");

    const dbCredentials: any = await mCol.findOne({
      username: username,
    });
    client.close();
    return dbCredentials;
  } catch (err) {
    client.close();
    return err;
  }
};
