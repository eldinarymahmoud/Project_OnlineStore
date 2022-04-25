import express, { Request, Response, NextFunction } from "express";
import { user, users } from "../models/users";
import jwt from "jsonwebtoken";

const userstore = new users();
/*************************************************************************/
// handler functions
const index = async (_req: Request, res: Response) => {
  try {
    const user = await userstore.index();
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await userstore.show(req.params.id as unknown as string);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: user = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    };
    const newUser = await userstore.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await userstore.delete(req.params.id as unknown as string);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userstore.authenticate(email, password);
    const token = jwt.sign(
      { user },
      process.env.TOKEN_SECRET as unknown as string
    );
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "email and password do not match",
      });
    }
    return res.json({
      status: "success!",
      data: { ...user, token },
      message: "Authentication completed!",
    });
  } catch (err) {
    throw new Error(`unable to authenticate user, please try again later.`);
  }
};

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.get("Authorization");

    if (auth) {
      const bearer = auth.split(" ")[0].toLowerCase();
      const tok = auth.split(" ")[1];
      if (tok && bearer === "bearer") {
        const decode = jwt.verify(
          tok,
          process.env.TOKEN_SECRET as unknown as string
        );

        if (decode) {
          next();
        } else {
          res
            .status(401)
            .json({ status: 401, message: "Authentication failed" });
        }
      } else {
        res.status(401).json({ status: 401, message: "Authentication failed" });
      }
    } else {
      res.status(401).json({ status: 401, message: "Authentication failed" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "Authentication failed" });
  }
};

const usersRoute = (app: express.Application) => {
  app.route("/users").get(validateToken, index);
  app.route("/users/:id").get(validateToken, show);
  app.route("/users/:id").delete(validateToken, destroy);
  app.post("/users", create);
  app.post("/authenticate", authenticate);
};
/************************************************************************ */
export default usersRoute;
