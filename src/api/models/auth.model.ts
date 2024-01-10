import client from "../../db/mongodb/connection";

export const authenticateUser = async (username: string, password: string) => {
  try {
    const mCl = await client.connect();

    const mDb = mCl.db("gatefold_users");

    const mCol = mDb.collection("users");

    const areValidCredentials =
      (await mCol.countDocuments({
        username: username,
        password: password,
      })) === 1;
    client.close();
    return areValidCredentials;
  } catch (err) {
    client.close();
    return err;
  }
};
