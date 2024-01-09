"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSpotify = void 0;
const axios_1 = __importDefault(require("axios"));
const searchSpotify = async () => {
    try {
        const data = await axios_1.default.get("https://api.spotify.com/v1/search?q=drake&type=album%2Cartist%2Ctrack", {
            headers: {
                Authorization: "Bearer BQAnWotn0kMjTkAdlkJU_3nK9CPrRnSuofrd8Ezwa12Db-okRvXq58MIJ4hDLjLX0WTJH0-FWmYAPeb9jU2qcWaAb-oxf1O0cahf9qiY7oRoLBvbozrCbRxHjf1RgIVEqnpoWUlqslA3xeeCeK633o8CQPk-hH5jtkb4cj3ucBKa6ZSdourdVvNtKaxLjpdyuw",
            },
        });
        console.log(data);
    }
    catch (err) { }
};
exports.searchSpotify = searchSpotify;
