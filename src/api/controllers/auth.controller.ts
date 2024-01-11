import { NextFunction, Request, Response } from "express";
import { authenticateUser } from "../models/auth.model";
import bcrypt from "bcryptjs";

export const checkUserCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { username, password: passwordAttempt },
    } = req;

    const dbCredentials = await authenticateUser(username, passwordAttempt);

    if (!dbCredentials) {
      res.status(200).send({
        areValidCredentials: {
          isValidUsername: false,
          isValidPassword: false,
        },
      });
    } else {
      const isValidUsername = "username" in dbCredentials;
      const isValidPassword = await bcrypt.compare(
        passwordAttempt,
        dbCredentials.password
      );

      res.status(200).send({
        areValidCredentials: {
          isValidUsername,
          isValidPassword,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
