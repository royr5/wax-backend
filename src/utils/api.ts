import axios, { AxiosError } from "axios";
import { SpotifyQueries } from "../types/api";

export const searchSpotify = async (token: string, q: string, type: string) => {
const types = type || "track,album,artist"

const reqString = `https://api.spotify.com/v1/search?q=${q}&type=${types}`

  // console.log("🚀 ~ searchSpotify ~ reqString:", reqString)
  try {
    return await axios({
      method: "get",
      // url: "https://api.spotify.com/v1/search?q=take%2520care&type=track%2Calbum&market=GB",
      url: reqString,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err: any) {
    // console.log("🚀 ~ searchSpotify ~ err:", err);
  }
};
