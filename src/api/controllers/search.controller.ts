import { NextFunction, Response, Request } from "express";
import { searchSpotify } from "../../utils/api";
import { refreshAccessToken } from "../models/login.models";
import { insertMusic, selectAllMusic } from "../models/music.models";
import { Music } from "../../types/api";

export const getSearchedMusic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { q, type } = req.query;
  try {
    const { access_token } = await refreshAccessToken();

    const matchedMusic = (await searchSpotify(
      access_token,
      q as string,
      type as string
    )) as Music[];

    if (matchedMusic) {
      const storedMusic = (await selectAllMusic()) as Music[];

      const storedMusicIds = storedMusic.map((music) => music.music_id);

      const musicOverlap = storedMusic.filter((music) =>
        matchedMusic.some((matched) => matched.music_id === music.music_id)
      );

      const musicDifference = matchedMusic.filter(
        (music) => !storedMusicIds.includes(music.music_id)
      );

        const insertedMusic = await insertMusic(musicDifference);


      const mergedMusic = Array.isArray(insertedMusic)
        ? [...musicOverlap, ...insertedMusic!]
        : [...musicOverlap, insertedMusic!];

      res.status(200).send({ music: mergedMusic });
    }
  } catch (err) {
    next(err);
  }
};
