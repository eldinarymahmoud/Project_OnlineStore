import express, { Request, Response, NextFunction } from "express";
import { product, products } from "../models/products";
import jwt from "jsonwebtoken";

const productstore = new products();
/*************************************************************************/
// handler functions

const index = async (_req: Request, res: Response) => {
  try {
    const product = await productstore.index();
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await productstore.show(req.params.id as unknown as string);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await productstore.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await productstore.delete(
      req.params.id as unknown as string
    );
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
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

const productsRoute = (app: express.Application) => {
  app.route("/products").get(validateToken, index);
  app.route("/products/:id").get(validateToken, show);
  app.route("/products").post(validateToken, create);
  app.route("/products/:id").delete(validateToken, destroy);
};
/************************************************************************ */
export default productsRoute;
