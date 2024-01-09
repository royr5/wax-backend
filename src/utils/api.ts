import axios, { AxiosError } from "axios";

export const searchSpotify = async (token: string, q: string, type: string) => {
  const types = type || "track,album,artist";

  const reqString = `https://api.spotify.com/v1/search?q=${q}&type=${types}`;

  try {
    return await axios({
      method: "get",
      url: reqString,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err: any) {
    console.log("🚀 ~ searchSpotify ~ err:", err);
  }
};
