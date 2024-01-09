"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestToken = exports.userAuth = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const qs_1 = __importDefault(require("qs"));
const dotenv = __importStar(require("dotenv"));
const redirect_uri = "http://localhost:3000/api/login/callback";
const ENV = process.env.NODE_ENV || "dev";
dotenv.config({ path: `${__dirname}/../../../.env.${ENV}` });
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const userAuth = async (res) => {
    const generateRandomString = (length) => {
        return crypto_1.default.randomBytes(60).toString("hex").slice(0, length);
    };
    const state = generateRandomString(16);
    const scope = "user-read-private user-read-email";
    res.redirect("https://accounts.spotify.com/authorize?" +
        qs_1.default.stringify({
            response_type: "code",
            client_id: client_id,
            // scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        }));
};
exports.userAuth = userAuth;
const requestToken = async (req, res) => {
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
            Authorization: "Basic " +
                Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
    };
    //   }
    const tokenData = await (0, axios_1.default)({
        method: "post",
        url: authOptions.url,
        data: authOptions.form,
        headers: authOptions.headers,
    });
    //! dev use only
    // console.log(Object.keys(tokenData));
    // console.log(tokenData.data);
};
exports.requestToken = requestToken;
