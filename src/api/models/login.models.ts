import { Response, Request } from "express";
import axios from "axios";

import crypto from "crypto";
import QueryString from "qs";
import * as dotenv from "dotenv";

const redirect_uri = "http://localhost:3000/api/spotify/login/callback";

const ENV = process.env.NODE_ENV || "dev";

dotenv.config({ path: `${__dirname}/../../../.env.${ENV}` });

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
// const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

export const userAuth = async (res: Response) => {
  const generateRandomString = (length: number) => {
    return crypto.randomBytes(60).toString("hex").slice(0, length);
  };

  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      QueryString.stringify({
        response_type: "code",
        client_id: client_id,
        // scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
};

export const requestToken = async (req: Request, res: Response) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  //   if (state === null) {
  //     res.redirect(
  //       "/#" +
  //         QueryString.stringify({
  //           error: "state_mismatch",
  //         })
  //     );
  //   } else {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };
  //   }

  const tokenData = await axios({
    method: "post",
    url: authOptions.url,
    data: authOptions.form,
    headers: authOptions.headers,
  });

  // ! dev use only
  console.log(Object.keys(tokenData));
  console.log(tokenData.data);
};

export const refreshAccessToken = async (req: Request) => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  const tokenData = await axios({
    method: "post",
    url: authOptions.url,
    data: authOptions.form,
    headers: authOptions.headers,
  });

  return tokenData.data
};
