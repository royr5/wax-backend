import { NextFunction, Response, Request } from "express";
import { insertMusic, selectAllMusic } from "../models/music.models";
import { Music } from "../../types/api";

export const getSearchedMusic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { matchedMusic } = req.body;
  try {
    if (matchedMusic) {
      const storedMusic = (await selectAllMusic(undefined, true)) as Music[];

      const storedMusicIds = storedMusic.map((music) => music.music_id);

      const musicOverlap = storedMusic.filter((music) =>
        matchedMusic.some(
          (matched: Music) => matched.music_id === music.music_id
        )
      );

      const musicDifference = matchedMusic.filter(
        (music: Music) => !storedMusicIds.includes(music.music_id)
      );

      if (!musicDifference.length) {
        res.status(200).send({ music: musicOverlap });
      } else {
        const insertedMusic = await insertMusic(musicDifference);

        const mergedMusic = Array.isArray(insertedMusic)
          ? [...musicOverlap, ...insertedMusic!]
          : [...musicOverlap, insertedMusic!];

        res.status(200).send({ music: mergedMusic });
      }
    }
  } catch (err) {
    next(err);
  }
};
